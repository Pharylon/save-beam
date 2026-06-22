import os
import json
import time
import sys
import google.generativeai as genai
from dotenv import load_dotenv

# Load local environment variables from .env if present
load_dotenv()

# Check for GEMINI_API_KEY
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    print("==========================================================")
    print("ERROR: GEMINI_API_KEY environment variable not found.")
    print("Please set your API key using one of these options:")
    print("1. Create a file named '.env' in this directory containing:")
    print("   GEMINI_API_KEY=your_actual_gemini_api_key")
    print("2. Set it in your terminal:")
    print("   Windows Powershell: $env:GEMINI_API_KEY=\"your_key\"")
    print("   Command Prompt:     set GEMINI_API_KEY=your_key")
    print("==========================================================")
    sys.exit(1)

# Configure the Gemini API client
genai.configure(api_key=api_key)
model_name = "gemini-3.1-flash-lite"  # Highly efficient for quick structured text tasks
print(f"Initializing Gemini API using model: {model_name}...")

# Load the base templates database
db_path = "templates.json"
if not os.path.exists(db_path):
    print(f"ERROR: Could not find '{db_path}'. Please run this script in the directory containing templates.json.")
    sys.exit(1)

with open(db_path, "r", encoding="utf-8") as f:
    db = json.load(f)

# Define the targets to expand
openers_to_expand = {
  "resident": "As a resident of Cherryville and a deeply concerned citizen, I am writing to urge you to vote against the proposed closure of W.B. Beam Intermediate School.",
  "parent": "As a parent of children in the Gaston County school system, I am writing to urge you to vote against the proposed closure of W.B. Beam Intermediate School.",
  "citizen": "As a concerned citizen of Gaston County, I am writing to urge you to vote against the proposed closure of W.B. Beam Intermediate School."
}

closing_base = "Please listen to the parents, teachers, and taxpayers of Cherryville. I urge you to vote 'NO' on the proposal to close W.B. Beam Intermediate."

def generate_variations(category_name, base_sentence, is_closing=False, max_retries=3):
    role_description = "You are a communications consultant helping community advocates save W.B. Beam Intermediate School in Cherryville, NC."
    
    if is_closing:
        type_desc = "closing call-to-action sentences"
        purpose_desc = "be the final sign-off paragraph in an advocacy email sent by residents to the Gaston County School Board"
    else:
        type_desc = f"opening sentences for a {category_name}"
        purpose_desc = f"be the introductory paragraph in an advocacy email sent by a {category_name} to the Gaston County School Board, establishing who they are and their opposition to the school closure"

    prompt = f"""{role_description}
Generate exactly 100 distinct, unique, and natural-sounding {type_desc} to {purpose_desc}.

Base statement idea:
"{base_sentence}"

CRITICAL REQUIREMENTS:
1. Vary the tone (e.g., firm, logical, polite, disappointed, angry, taxpayer-oriented, parent-focused), syntax, vocabulary, sentence structure, and style.
2. It should feel casual and REAL. Occasional typos, run-on sentences, and simple grammar are OK!
3. Write at a 6th grade reading level. These are emails sent by normal people, not lawyers or politicians. Make them look authentic.
4. Do not use placeholders, numbering, bullet points, prefix indexes, or quotation marks inside the strings.
5. Return your response strictly as a JSON object with a single key "variations" containing a list of exactly 100 strings.
   Format:
   {{
     "variations": [
       "first variation string",
       "second variation string",
       ...
     ]
   }}
"""
    
    for attempt in range(1, max_retries + 1):
        try:
            print(f"  [Attempt {attempt}] Requesting 100 variations from Gemini...")
            model = genai.GenerativeModel(model_name)
            response = model.generate_content(
                prompt,
                generation_config={"response_mime_type": "application/json"}
            )
            
            # Parse response JSON
            data = json.loads(response.text)
            variations = data.get("variations", [])
            
            if not isinstance(variations, list) or len(variations) < 80:
                print(f"  [Warning] Received only {len(variations)} variations. Retrying to get closer to 100...")
                continue
                
            print(f"  [Success] Generated {len(variations)} unique variations!")
            return variations
            
        except Exception as e:
            print(f"  [Error] Request failed: {e}")
            if attempt < max_retries:
                time.sleep(3)
            else:
                print("  [Fatal] Max retries reached for this part.")
                return None

# Ensure relationshipOpeners structure exists
if "relationshipOpeners" not in db:
    db["relationshipOpeners"] = {}

# 1. Generate Openers
for index, (key, base_sentence) in enumerate(openers_to_expand.items(), start=1):
    print(f"\n({index}/4) Expanding opener key '{key}'...")
    print(f"  Base opener: \"{base_sentence}\"")
    
    variations = generate_variations(key, base_sentence, is_closing=False)
    if variations:
        db["relationshipOpeners"][key] = variations
        # Save progress dynamically
        with open(db_path, "w", encoding="utf-8") as f:
            json.dump(db, f, indent=2, ensure_ascii=False)
        print(f"  Saved progress for opener '{key}' into '{db_path}'.")
    else:
        print(f"  [Warning] Skipping opener key '{key}' due to generation failure. Retaining fallback.")
    time.sleep(2)

# 2. Generate Closings
print(f"\n(4/4) Expanding closing statements...")
print(f"  Base closing: \"{closing_base}\"")
variations = generate_variations("closings", closing_base, is_closing=True)
if variations:
    db["closings"] = variations
    # Save progress
    with open(db_path, "w", encoding="utf-8") as f:
        json.dump(db, f, indent=2, ensure_ascii=False)
    print(f"  Saved progress for closing statements into '{db_path}'.")
else:
    print(f"  [Warning] Skipping closings due to generation failure. Retaining fallback.")

print("\n==========================================================")
print("Openers and closings expansion completed!")
print(f"Please inspect '{db_path}' to see the expanded database.")
print("==========================================================")

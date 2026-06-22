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

# Define the 12 parts and their base sentences to expand
parts_to_expand = {
  "financialsPart1": "The board's projected savings of $288,000 from closing Beam Intermediate are highly suspect/overrated/etc. Once you account for student-tied Title 1 funds, shared teachers, and grant-funded SROs transferring with the children, the true net savings fall to $90,000 according to The Cherryville Education Alliance's study and the county hasn't given any evidence to dispute that.",
  "financialsPart2": "Gaston County Schools is not the most costly school per-student. Public records requests have revealed Gaston County Schools does not even track individual budgets per school. Voting to close a school without knowing its baseline operating cost is fiscally irresponsible.",
  "financialsPart3": "Cherryville is already underfunded compared to more affluent cities in the county.",
  
  "capacityPart1": "We must also look at school capacity, as W.B. Beam Intermediate is currently operating at an efficient 87% utilization (or phrase it as 'almost 90%' or something similar). Voting to close Beam will immediately push Cherryville Elementary will overcrowd our schools even more.",
  "capacityPart2": "Chavis is already facing huge classroom overcrowding issues and doesn't have the room or resources to take on Beam's student population.",
  "capacityPart3": "Overcrowded classrooms degrade the learning environment and stretch our teachers past their limits. The decision to transition 5th graders to John Chavis Middle School presents severe developmental risks for our kids. It strips them of a dedicated upper-elementary environment and cancels crucial identity-building programs like Battle of the Books, Math Masters, and Robotics that help them thrive.",
  
  "growthPart1": "This closure is particularly short-sighted because Cherryville is entering a period of significant residential growth. With hundreds of new housing units already approved, school enrollment will rise steadily over the next decade.",
  "growthPart2": "If we push Cherryville schools to near-1005 capacity now, how will they deal with growth? Reopening or expanding schools is much harder than shutting them down",
  "growthPart3": "Closing Beam now is a short-sighted mistake that will leave our district unprepared and force us to build new facilities later.",
  
  "educationalPart1": "Moving fifth graders to John Chavis Middle School is a major developmental mistake. These are elementary school students mingling with teenagers!",
  "educationalPart2": "Fifth graders thrive in elementary environments, and moving them to a middle school will strip them of essential upper-elementary identity programs.",
  "educationalPart3": "Our school would be the only one in the county without encore classes. It seems these were stripped from us to free up rooms for consolidation."
}

def generate_variations(key, base_sentence, max_retries=3):
    prompt = f"""You are a communications consultant helping community advocates save W.B. Beam Intermediate School in Cherryville, NC.
Generate exactly 100 distinct, unique, and natural-sounding sentances making the general point below, to be used in advocacy emails sent by residents to the Gaston County School Board:

"{base_sentence}"

CRITICAL REQUIREMENTS:
1. Vary the tone (e.g., firm, logical, polite, disappointed, angry, taxpayer-oriented, parent-focused), syntax, vocabulary, sentence structure, and style.
2. Leave some information out sometimes. It's OK! Not everyone has the exact same talking points!
3. It's OK to slightly misrepresent information if it makes it sound better or more impactful. 
4. Sometimes write a short sentence, sometimes multiple. It should feel casual and REAL. Ocassional typos, run-on sentences, and bad grammar are OK!
5. Write at a 6th grade reading level. These are emails sent by normal people, not lawyers or politicians. Make them look real.
6. Do not use placeholders, numbering, bullet points, prefix indexes, or quotation marks inside the strings.
7. Return your response strictly as a JSON object with a single key "variations" containing a list of exactly 100 strings.
   Format:
   {{
     "variations": [
       "first sentence variation",
       "second sentence variation",
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

# Loop and generate variations for each of the 12 parts
total_keys = len(parts_to_expand)
for index, (key, base_sentence) in enumerate(parts_to_expand.items(), start=1):
    print(f"\n({index}/{total_keys}) Expanding key '{key}'...")
    print(f"  Base sentence: \"{base_sentence}\"")
    
    variations = generate_variations(key, base_sentence)
    if variations:
        db[key] = variations
        # Save progress dynamically after each success
        with open(db_path, "w", encoding="utf-8") as f:
            json.dump(db, f, indent=2, ensure_ascii=False)
        print(f"  Saved progress for '{key}' into '{db_path}'.")
    else:
        print(f"  [Warning] Skipping key '{key}' due to generation failure. Retaining fallback templates.")
    
    # Avoid hitting rate limits
    time.sleep(2)

print("\n==========================================================")
print("Template expansion completed!")
print(f"Please inspect '{db_path}' to see the expanded database.")
print("==========================================================")

export interface EmergencyGuide {
  id: string;
  title: string;
  description: string;
  content: string;
}

export const emergencyGuides: EmergencyGuide[] = [
  {
    id: "forest-emergencies",
    title: "Forest Area Emergencies",
    description: "Safety protocols for forest fires, wild animals, landslides, and snakebites",
    content: `
      <div class="space-y-6">
        <section>
          <h2 class="text-2xl font-bold text-primary mb-4">1. Forest Fire</h2>
          <ul class="space-y-2 list-disc pl-6">
            <li>Move away from the fire in the opposite direction of smoke.</li>
            <li>Cover your nose and mouth with a wet cloth or sleeve.</li>
            <li>Stay low to the ground to avoid smoke.</li>
            <li>Do not run uphill—move downhill or sideways.</li>
            <li>If trapped, find a clear area with no dry grass and lie close to the ground.</li>
            <li class="font-bold text-emergency">Use SOS immediately.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-primary mb-4">2. Wild Animal Encounters</h2>
          <ul class="space-y-2 list-disc pl-6">
            <li class="font-bold">Do NOT run; running triggers attack.</li>
            <li>Back away slowly while facing the animal.</li>
            <li>Make yourself look bigger and wave your hands.</li>
            <li>Make loud noise to scare the animal.</li>
            <li class="font-bold text-emergency">Move to an open area and call for help using SOS.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-primary mb-4">3. Landslides</h2>
          <ul class="space-y-2 list-disc pl-6">
            <li>Move immediately to higher and stable ground.</li>
            <li>Avoid standing under cliffs, large trees, or loose soil.</li>
            <li>Stay away from riverbanks during heavy rains.</li>
            <li>Wait for rescue rather than trying to climb unstable slopes.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-primary mb-4">4. Snakebite & Poisonous Creatures</h2>
          <p class="font-semibold mb-3">If bitten by a snake or poisonous insect:</p>
          <ul class="space-y-2 list-disc pl-6 mb-4">
            <li class="font-bold">Stay calm — moving too much spreads the venom faster.</li>
            <li>Keep the bitten limb still and below heart level.</li>
            <li class="font-bold">Do NOT cut the wound, suck venom, or tie a tight band.</li>
            <li class="font-bold">Do NOT apply ice or herbs.</li>
            <li>Wash gently with clean water.</li>
            <li>Remove rings/watches if the limb starts to swell.</li>
            <li class="font-bold text-emergency">Use SOS immediately for medical help.</li>
            <li>Try to remember the snake's color (do NOT try to catch it).</li>
          </ul>
          <p class="font-semibold mb-3">For scorpion or spider stings:</p>
          <ul class="space-y-2 list-disc pl-6">
            <li>Wash the area with clean water.</li>
            <li>Apply a cool cloth (not ice directly).</li>
            <li class="font-bold text-emergency">Use SOS if swelling, pain, or breathing problems appear.</li>
          </ul>
        </section>
      </div>
    `
  },
  {
    id: "riverside-emergencies",
    title: "Riverside Area Emergencies",
    description: "Safety protocols for floods, drowning, erosion, and waterborne illness",
    content: `
      <div class="space-y-6">
        <section>
          <h2 class="text-2xl font-bold text-primary mb-4">1. Flood / Rising Water</h2>
          <ul class="space-y-2 list-disc pl-6">
            <li>Move to higher ground immediately.</li>
            <li class="font-bold">Do NOT enter fast-moving water.</li>
            <li>If water is above knee level, turn back.</li>
            <li>Keep valuables and children close.</li>
            <li class="font-bold text-emergency">Activate SOS if trapped or injured.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-primary mb-4">2. Drowning Situations</h2>
          <ul class="space-y-2 list-disc pl-6 mb-4">
            <li>If you can't swim, float on your back.</li>
            <li>Look for something that floats (bottle, wood, tub, bucket).</li>
            <li>Call for help loudly.</li>
          </ul>
          <p class="font-semibold mb-3">For others drowning:</p>
          <ul class="space-y-2 list-disc pl-6">
            <li class="font-bold">Throw a rope or floating object — do NOT jump in unless trained.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-primary mb-4">3. Riverbank Erosion</h2>
          <ul class="space-y-2 list-disc pl-6">
            <li>Move away from cracks or soft ground near the edge.</li>
            <li>Do not go near the riverbank after heavy rain.</li>
            <li>Relocate livestock early.</li>
            <li class="font-bold text-emergency">Use SOS to call for evacuation if needed.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-primary mb-4">4. Waterborne Illness After Floods</h2>
          <ul class="space-y-2 list-disc pl-6">
            <li class="font-bold">Do NOT drink floodwater.</li>
            <li>Boil water whenever possible.</li>
            <li>Wash hands and avoid touching contaminated water.</li>
            <li class="font-bold text-emergency">Seek medical help via SOS if sick.</li>
          </ul>
        </section>
      </div>
    `
  },
  {
    id: "city-emergencies",
    title: "City / Urban Area Emergencies",
    description: "Safety protocols for urban flooding, fires, stampedes, and health issues",
    content: `
      <div class="space-y-6">
        <section>
          <h2 class="text-2xl font-bold text-primary mb-4">1. Flooding in City</h2>
          <ul class="space-y-2 list-disc pl-6">
            <li>Move to upper floors or safe buildings.</li>
            <li>Avoid waterlogged roads — there may be open drains or electricity hazards.</li>
            <li class="font-bold">Do NOT drive through flooded roads.</li>
            <li class="font-bold text-emergency">Keep phones dry and use SOS if stuck.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-primary mb-4">2. Fire Emergencies</h2>
          <ul class="space-y-2 list-disc pl-6">
            <li>Use stairs, not lifts.</li>
            <li>Cover nose/mouth with cloth.</li>
            <li>Crawl under smoke (smoke rises).</li>
            <li>Evacuate calmly and help children/elderly first.</li>
            <li class="font-bold text-emergency">Activate SOS after exiting safely.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-primary mb-4">3. Accidents & Stampedes</h2>
          <ul class="space-y-2 list-disc pl-6">
            <li>Move sideways out of the crowd.</li>
            <li>Protect head and chest with your arms.</li>
            <li>If someone falls, help them stand quickly.</li>
            <li class="font-bold text-emergency">Use SOS for injuries.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-primary mb-4">4. Health & Sanitation Issues</h2>
          <ul class="space-y-2 list-disc pl-6">
            <li>Avoid touching dirty or contaminated water.</li>
            <li>Wash hands often.</li>
            <li>Use first aid for small cuts.</li>
            <li class="font-bold text-emergency">Seek SOS help if someone is bleeding, unconscious, or not breathing.</li>
          </ul>
        </section>
      </div>
    `
  }
];

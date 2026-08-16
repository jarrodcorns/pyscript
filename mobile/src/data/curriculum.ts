import type { DayContent } from '../types';

const phaseTitles: Record<DayContent['phase'], string> = {
  1: 'Phase 1: Grounding & Separation of Self',
  2: 'Phase 2: Micro-Connections & Safe Touch',
  3: 'Phase 3: Communication Without Pressure',
  4: 'Phase 4: The Long Anchor',
};

export const curriculum: DayContent[] = [
  {
    day: 1,
    phase: 1,
    phaseTitle: phaseTitles[1],
    title: 'The Storm Outside vs. The Storm Within',
    theme: 'Their withdrawal is often an internal battle — not a verdict on your worth.',
    dailyRead:
      'When a partner is overwhelmed by depression or anxiety, their nervous system can enter conservation mode. Warmth, enthusiasm, and physical connection may shrink not because love left, but because capacity is low. Today is about separating their internal struggle from your self-worth. You can be steady without drowning in the same wave.',
    example:
      'If your partner greets you with flat energy, resist “What did I do wrong?” Try: “Their battery is low. This is their fight — not proof I am unlovable.”',
    practice:
      'Silent High-Five: Give a gentle high-five or shoulder squeeze, smile, and walk away without expecting conversation.',
    reflection: 'Notice any urge to seek validation today. Stay grounded instead.',
    evidenceNote:
      'Caregiver research shows partners often misread depressive withdrawal as personal rejection, which increases distress on both sides.',
    sourceIds: ['caregiver-burden-2026', 'who-depression-2025'],
  },
  {
    day: 2,
    phase: 1,
    phaseTitle: phaseTitles[1],
    title: 'Lowering the Thermal Pressure',
    theme: 'Remove heavy expectations so the home can breathe.',
    dailyRead:
      'Constant monitoring — “Are you feeling better yet?” — can spike anxiety and shame. A secure home is one where neither of you has to perform wellness. Today, practice lowering ambient pressure.',
    example:
      'Swap “How are you feeling right now?” for “No pressure — I’m making tea if you want some.”',
    practice:
      'Hide a silly post-it with an inside joke where they will find it later (coffee mug, jacket pocket).',
    reflection: 'Notice whether the room feels calmer when you stop interrogating mood.',
    evidenceNote: 'Positive dyadic coping improves outcomes; critical monitoring tends to worsen them.',
    sourceIds: ['bertschi-2023'],
  },
  {
    day: 3,
    phase: 1,
    phaseTitle: phaseTitles[1],
    title: 'Your Cup Is Yours to Fill',
    theme: 'Stability starts with your own emotional regulation.',
    dailyRead:
      'Supporting a struggling partner can quietly drain your reserves. If your wellbeing depends entirely on their mood, both of you become less safe. Today, identify one non-negotiable act of self-care that does not require their participation.',
    example:
      'Take a 20-minute walk alone without apologizing for leaving them on the couch.',
    practice: 'Schedule one solo activity today and protect it like an appointment.',
    reflection: 'Guilt is common here. Notice it — do not obey it automatically.',
    evidenceNote: 'Partner strain is real; protecting your mental health supports the whole household.',
    sourceIds: ['caregiver-burden-2026'],
  },
  {
    day: 4,
    phase: 1,
    phaseTitle: phaseTitles[1],
    title: 'Name the Story, Don’t Become It',
    theme: 'Catch catastrophic interpretations before they hijack your behavior.',
    dailyRead:
      'Depression and anxiety invite stories: “They don’t care.” “This marriage is over.” “I am invisible.” Stories are not facts. Today, practice labeling the story as a story — then choose one grounded action.',
    example:
      'When you think “They’re done with me,” add: “That is fear talking. I will offer warmth without demand.”',
    practice: 'Write one fearful thought and one alternative explanation that could also be true.',
    reflection: 'Did naming the story reduce urgency to confront or chase?',
    evidenceNote: 'Cognitive patterns in partners can amplify relationship distress during depressive episodes.',
    sourceIds: ['bertschi-2023', 'who-depression-2025'],
  },
  {
    day: 5,
    phase: 1,
    phaseTitle: phaseTitles[1],
    title: 'Boundaries Are Care, Not Punishment',
    theme: 'You can be compassionate and still protect your limits.',
    dailyRead:
      'Boundaries are not walls against love — they are guardrails that keep resentment from becoming contempt. You may need limits around harsh speech, cancelled plans, or your own sleep. A boundary sounds like: “I want to be here with you, and I can’t engage when voices are raised.”',
    example:
      'If a conversation turns circular and heated, pause: “I care about you. I’m stepping away for 20 minutes and coming back.”',
    practice: 'Identify one boundary you need this week and phrase it without blame.',
    reflection: 'Did the boundary create distance — or prevent a worse rupture?',
    evidenceNote: 'Sustainable caregiving requires limits; burnout increases negative coping.',
    sourceIds: ['caregiver-burden-2026'],
  },
  {
    day: 6,
    phase: 1,
    phaseTitle: phaseTitles[1],
    title: 'Medication, Illness, and “Not About Me”',
    theme: 'Separate symptoms and side effects from relationship intent.',
    dailyRead:
      'Low desire, emotional flatness, fatigue, and irritability can come from depression, anxiety, sleep disruption, or psychiatric medication. SSRIs and SNRIs are commonly associated with sexual dysfunction and, for some people, emotional blunting. This is not permission to minimize your needs — it is a reason not to treat every symptom as rejection.',
    example:
      'Instead of “You never want me anymore,” try “I miss closeness. I know illness and meds can change capacity. Can we talk about what feels possible?”',
    practice: 'Read the in-app article on SSRIs and connection in the Learn tab.',
    reflection: 'What shifted when you considered biology alongside emotion?',
    evidenceNote:
      'Sexual side effects are common on SSRIs/SNRIs; emotional blunting may overlap with residual depression.',
    sourceIds: ['uptodate-ssri-sexual', 'ssri-meta-2026', 'emotional-blunting-review'],
  },
  {
    day: 7,
    phase: 1,
    phaseTitle: phaseTitles[1],
    title: 'Building the Secure Base',
    theme: 'Consolidate your calm before stepping into active connection.',
    dailyRead:
      'You have spent a week practicing separation of self: their struggle is not your verdict. Today, acknowledge your steadiness. A secure base does not fix the storm — it survives it.',
    example:
      'Take 30 minutes for your own project or movement without guilt about leaving them resting.',
    practice: 'Solo reward: favorite drink or meal as recognition of your quiet strength.',
    reflection: 'Are you slightly less reactive to daily mood swings than on Day 1?',
    evidenceNote: 'Partner stability supports dyadic coping; your regulation is part of the system.',
    sourceIds: ['bertschi-2023'],
  },
  {
    day: 8,
    phase: 2,
    phaseTitle: phaseTitles[2],
    title: 'Touch Without a Hidden Invoice',
    theme: 'Make physical contact safe by making expectations explicit.',
    dailyRead:
      'When intimacy drops, affection can feel like a down payment on sex. Today, offer touch that is short, clear, and free of escalation. Consent and predictability rebuild trust faster than persuasion.',
    example:
      '“I’d like to hold your hand for a minute — no agenda afterward.”',
    practice: '10-second hand hold while sitting together, then let go first.',
    reflection: 'Watch for shoulder-drop relief when no performance is required.',
    evidenceNote: 'Pressure tends to increase avoidance; safety-first touch supports reconnection.',
    sourceIds: ['uptodate-ssri-sexual'],
  },
  {
    day: 9,
    phase: 2,
    phaseTitle: phaseTitles[2],
    title: 'Parallel Presence',
    theme: 'Togetherness does not always require conversation.',
    dailyRead:
      'Low-energy days may not support deep talks. Parallel presence — reading in the same room, cooking nearby, sharing music — can maintain bond without demanding emotional output.',
    example:
      'Sit in the same space with separate activities for 30 minutes. No “we need to talk” energy.',
    practice: 'Choose a low-stimulation shared activity (walk, puzzle, playlist).',
    reflection: 'Did quiet togetherness feel closer than forced conversation?',
    evidenceNote: 'Behavioral activation and low-pressure contact are consistent with depression recovery support.',
    sourceIds: ['who-depression-2025'],
  },
  {
    day: 10,
    phase: 2,
    phaseTitle: phaseTitles[2],
    title: 'The 30-Second Check-In',
    theme: 'Brief, bounded emotional contact beats long interrogations.',
    dailyRead:
      'Long “how are you really?” talks can overwhelm a depleted partner. A 30-second check-in respects capacity: one feeling, one need, one appreciation.',
    example:
      '“One word for your day? Mine was ‘heavy.’ I appreciate you letting me sit with you.”',
    practice: 'Run the 30-second check-in once today — then stop.',
    reflection: 'Did brevity make honesty easier?',
    evidenceNote: 'Dyadic coping improves when stress is named without criticism.',
    sourceIds: ['bertschi-2023'],
  },
  {
    day: 11,
    phase: 2,
    phaseTitle: phaseTitles[2],
    title: 'Celebrate Micro-Wins',
    theme: 'Notice effort, not only outcomes.',
    dailyRead:
      'Depression shrinks visible progress. A shower, a returned text, attending an appointment — these may be enormous internally. Acknowledging effort reduces shame and increases cooperation.',
    example:
      '“I saw you refill your water bottle. That matters.”',
    practice: 'Name one small effort your partner made today — without adding a to-do list.',
    reflection: 'How did they respond to effort-based praise vs. outcome pressure?',
    evidenceNote: 'Shame and performance pressure worsen anxiety and withdrawal.',
    sourceIds: ['who-depression-2025', 'bertschi-2023'],
  },
  {
    day: 12,
    phase: 2,
    phaseTitle: phaseTitles[2],
    title: 'Repair the Near-Miss',
    theme: 'Small ruptures deserve small repairs.',
    dailyRead:
      'You will misread tone, snap, or withdraw. Repair is not groveling — it is clarity: “I was sharp earlier. I’m not giving up on us.” Quick repairs prevent resentment stockpiling.',
    example:
      'If you chased or criticized yesterday, today offer: “I’m trying a softer approach. No lecture — just care.”',
    practice: 'Deliver one repair sentence within 24 hours of a tense moment.',
    reflection: 'Did repair lower tension faster than being “right”?',
    evidenceNote: 'Relationship maintenance behaviors buffer distress during chronic illness.',
    sourceIds: ['bertschi-2023'],
  },
  {
    day: 13,
    phase: 2,
    phaseTitle: phaseTitles[2],
    title: 'Sensate Focus at Home (PG Edition)',
    theme: 'Rebuild body trust without a sexual goal.',
    dailyRead:
      'Clinicians often rebuild intimacy through non-genital touch because it lowers performance anxiety. You are not conducting therapy — you are borrowing the principle: sensation and safety first.',
    example:
      'Offer a 3-minute shoulder rub with a timer visible. “Stop me anytime.”',
    practice: 'Agree on a timed, non-sexual touch ritual. Honor “stop” immediately.',
    reflection: 'Did explicit timing reduce brace-response?',
    evidenceNote: 'Antidepressant-related sexual dysfunction improves when pressure and goal-focused sex are reduced.',
    sourceIds: ['uptodate-ssri-sexual'],
  },
  {
    day: 14,
    phase: 2,
    phaseTitle: phaseTitles[2],
    title: 'De-escalating the Intimacy Threat',
    theme: 'Rebuild physical contact without sexual expectations.',
    dailyRead:
      'When medication or illness reduces desire, touch can feel like a demand. Trust returns when touch is 100% safe and expectation-free. This is not permanent celibacy — it is triage for connection.',
    example:
      '“Just relax — I want to rub your feet for two minutes. No strings.”',
    practice: 'Hand-Hold Benchmark: hold hands for 10 seconds, then release first.',
    reflection: 'Did their body relax when the agenda disappeared?',
    evidenceNote: 'Sexual side effects are common; pressure typically deepens avoidance.',
    sourceIds: ['ssri-meta-2026', 'uptodate-ssri-sexual'],
  },
  {
    day: 15,
    phase: 3,
    phaseTitle: phaseTitles[3],
    title: 'Ask Permission to Talk',
    theme: 'Invite hard conversations instead of ambushing.',
    dailyRead:
      'Surprise debriefs about the relationship or medication can trigger shutdown. Ask for a window: “Is now okay for 10 minutes, or should we pick a time tomorrow?”',
    example:
      '“I’d like to talk about closeness — not to fix tonight, just to understand. When works?”',
    practice: 'Schedule a 10-minute conversation window and keep the time limit.',
    reflection: 'Did scheduling reduce defensiveness?',
    evidenceNote: 'Anxiety-linked couples benefit from structured, lower-intensity communication.',
    sourceIds: ['social-anxiety-relationships'],
  },
  {
    day: 16,
    phase: 3,
    phaseTitle: phaseTitles[3],
    title: 'Speak Impact, Not Accusation',
    theme: 'Use “I” language that describes experience, not character.',
    dailyRead:
      '“You never try” invites defense. “I feel lonely when evenings are silent” invites problem-solving. You are describing your inner weather, not issuing a verdict on theirs.',
    example:
      'Replace “You’re always on your phone” with “I miss you after dinner. Could we do 15 phone-free minutes?”',
    practice: 'Write one complaint as an impact statement and share it calmly.',
    reflection: 'Did impact language change their receptivity?',
    evidenceNote: 'Communication quality mediates relationship satisfaction during mental illness.',
    sourceIds: ['bertschi-2023'],
  },
  {
    day: 17,
    phase: 3,
    phaseTitle: phaseTitles[3],
    title: 'The Medical Team Is Not the Enemy',
    theme: 'Support treatment conversations without directing them.',
    dailyRead:
      'You are not the prescriber. You can still advocate for your marriage by encouraging symptom reporting — especially sexual side effects and emotional flatness, which are often under-discussed. Never suggest stopping or changing doses.',
    example:
      '“Would it help if we wrote down side effects before your follow-up? I’ll go with you if you want.”',
    practice: 'Offer to help track mood, sleep, libido, or side effects for their clinician — only if they want that.',
    reflection: 'Did you stay in support role vs. control role?',
    evidenceNote: 'NICE and NHS guidance emphasize tapering antidepressants with medical supervision, not abrupt stops.',
    sourceIds: ['nice-ng222', 'nhs-antidepressants', 'uptodate-ssri-sexual'],
  },
  {
    day: 18,
    phase: 3,
    phaseTitle: phaseTitles[3],
    title: 'When to Bring in Professionals',
    theme: 'Know the line between support and clinical need.',
    dailyRead:
      'This program is education, not treatment. Seek urgent help for suicidal thoughts, self-harm, psychosis, inability to care for self, or violence. Couple therapy may help when conflict and depression reinforce each other.',
    example:
      'If safety is uncertain, contact local emergency services or SADAG 0800 567 567 (South Africa).',
    practice: 'Save crisis numbers in your phone today (see Support tab).',
    reflection: 'Do you know your local crisis pathway if symptoms worsen?',
    evidenceNote: 'WHO notes depression increases suicide risk; early professional care matters.',
    sourceIds: ['who-depression-2025', 'sadag', 'cochrane-couple-therapy'],
  },
  {
    day: 19,
    phase: 3,
    phaseTitle: phaseTitles[3],
    title: 'Grieve What Changed',
    theme: 'Honoring loss makes room for adaptation.',
    dailyRead:
      'You may mourn the version of your partner or marriage that existed before illness or medication. Grief is not betrayal. Unprocessed grief often leaks out as anger or scorekeeping.',
    example:
      'Journal: “I miss ___. I’m still here for ___. Both can be true.”',
    practice: '10 minutes of private writing about what you miss — without sharing unless you choose to.',
    reflection: 'Did naming grief reduce resentment today?',
    evidenceNote: 'Partner burden includes ambiguous loss and identity grief.',
    sourceIds: ['caregiver-burden-2026'],
  },
  {
    day: 20,
    phase: 3,
    phaseTitle: phaseTitles[3],
    title: 'Rebuild Rituals',
    theme: 'Predictable rituals beat sporadic grand gestures.',
    dailyRead:
      'Grand surprises can overwhelm a depleted nervous system. Small repeating rituals — Friday tea, Sunday walk, goodnight check — create relational predictability.',
    example:
      'Pick a 5-minute ritual you can repeat weekly, not a one-time date night overhaul.',
    practice: 'Start one micro-ritual tonight.',
    reflection: 'Did predictability feel safer than spontaneity?',
    evidenceNote: 'Routine supports depression recovery and reduces partner hypervigilance.',
    sourceIds: ['who-depression-2025'],
  },
  {
    day: 21,
    phase: 3,
    phaseTitle: phaseTitles[3],
    title: 'Phase 3 Milestone: Clear & Kind',
    theme: 'You can tell the truth without turning it into a weapon.',
    dailyRead:
      'You have practiced permission-based talks, impact language, medical boundaries, and grief honesty. The goal is not conflict elimination — it is faster, kinder repair.',
    example:
      'End a conversation with: “I’m on your team even when this is hard.”',
    practice: 'Share one appreciation and one honest need today — keep both under two sentences each.',
    reflection: 'Which communication shift felt most sustainable?',
    evidenceNote: 'Positive dyadic coping strengthens long-term relationship functioning.',
    sourceIds: ['bertschi-2023'],
  },
  {
    day: 22,
    phase: 4,
    phaseTitle: phaseTitles[4],
    title: 'Design Your Maintenance Mode',
    theme: 'Stability is built, not discovered.',
    dailyRead:
      'Crisis mode cannot be permanent. Maintenance mode means knowing your non-negotiables: sleep, solo time, weekly check-in, crisis plan, and intimacy pace that respects both bodies.',
    example:
      'Draft three household rules that protect peace (e.g., no relationship talks after 9pm).',
    practice: 'Write your personal maintenance list — share only what feels safe.',
    reflection: 'What prevents you from slipping back into hypervigilance?',
    evidenceNote: 'Sustained partner strain predicts burnout; maintenance prevents relapse into crisis coping.',
    sourceIds: ['caregiver-burden-2026'],
  },
  {
    day: 23,
    phase: 4,
    phaseTitle: phaseTitles[4],
    title: 'Desire May Ebb — Devotion Can Remain',
    theme: 'Separate commitment from moment-to-moment chemistry.',
    dailyRead:
      'Low libido seasons do not automatically mean low love. Many couples rebuild satisfying intimacy after medication adjustments, therapy, or phased touch work. Today, focus on dependable care rather than spark.',
    example:
      '“I’m not taking distance personally today. I’m staying warm and patient.”',
    practice: 'Do one act of service that is clearly not a bid for sex.',
    reflection: 'Did service feel connecting without pressure?',
    evidenceNote: 'Sexual dysfunction on SSRIs is common and often manageable with clinical support.',
    sourceIds: ['ssri-meta-2026', 'uptodate-ssri-sexual'],
  },
  {
    day: 24,
    phase: 4,
    phaseTitle: phaseTitles[4],
    title: 'Your Support Network',
    theme: 'You are not meant to carry this alone.',
    dailyRead:
      'Isolation magnifies caregiver burden. One trusted friend, support group, or therapist for you can protect the marriage from becoming the only container for pain.',
    example:
      'Text one person: “Going through a heavy season. Can we talk briefly this week?”',
    practice: 'Identify one support resource for yourself (friend, therapist, group).',
    reflection: 'What stops you from asking for help — shame, privacy, or habit?',
    evidenceNote: 'Caregiver burden is lower when social support is present.',
    sourceIds: ['caregiver-burden-2026'],
  },
  {
    day: 25,
    phase: 4,
    phaseTitle: phaseTitles[4],
    title: 'Money, Work, and Mental Load',
    theme: 'Practical stressors are relational stressors.',
    dailyRead:
      'Depression affects work, finances, and household tasks. Unspoken resentment about mental load can eclipse emotional intimacy. Name logistics plainly without moralizing illness.',
    example:
      '“Here’s what I can cover this week. What feels realistic for you?”',
    practice: 'List three practical tasks. Divide or defer without scorekeeping.',
    reflection: 'Did clarity reduce background tension?',
    evidenceNote: 'Functional impairment from depression increases caregiver burden across domains.',
    sourceIds: ['caregiver-burden-2026', 'who-depression-2025'],
  },
  {
    day: 26,
    phase: 4,
    phaseTitle: phaseTitles[4],
    title: 'Kids, Family, and Privacy',
    theme: 'Protect the couple inside the larger system.',
    dailyRead:
      'If children or relatives are involved, decide together what is private, what is shared, and how to explain absences or medication without shame. Unified messaging reduces secondary stress.',
    example:
      'Agree on one sentence you both can use with family: “We’re working through a health season privately.”',
    practice: 'Align on one privacy boundary with the outside world.',
    reflection: 'Did alignment reduce feeling judged or exposed?',
    evidenceNote: 'Family stress amplifies negative dyadic coping patterns.',
    sourceIds: ['bertschi-2023'],
  },
  {
    day: 27,
    phase: 4,
    phaseTitle: phaseTitles[4],
    title: 'Revisit Intimacy Goals Together',
    theme: 'Collaborative goals beat unspoken expectations.',
    dailyRead:
      'If sexual intimacy is important to both of you, define success in phases: safety, sensuality, then desire. If priorities differ, negotiate honestly. Medical follow-up belongs in this conversation.',
    example:
      '“What would ‘enough closeness for now’ look like for each of us?”',
    practice: 'Have a goals conversation with explicit no-pressure ground rules.',
    reflection: 'Did co-created goals feel fairer than assumed ones?',
    evidenceNote: 'Clinical management of antidepressant sexual effects requires open reporting and prescriber involvement.',
    sourceIds: ['uptodate-ssri-sexual', 'nice-ng222'],
  },
  {
    day: 28,
    phase: 4,
    phaseTitle: phaseTitles[4],
    title: 'Plan for Setbacks',
    theme: 'Relapse in symptoms is not relapse in progress.',
    dailyRead:
      'Depression and anxiety fluctuate. Medication changes take time. A bad week does not erase a month of steadier coping. Pre-decide how you will respond to setbacks without panic or blame.',
    example:
      '“If we have a dark week, we return to Phase 1 tools before we problem-solve the marriage.”',
    practice: 'Write a 5-line setback plan.',
    reflection: 'Does having a plan make future dips feel less catastrophic?',
    evidenceNote: 'WHO and NICE emphasize ongoing monitoring and gradual adjustment, not abrupt reactions.',
    sourceIds: ['who-depression-2025', 'nice-ng222'],
  },
  {
    day: 29,
    phase: 4,
    phaseTitle: phaseTitles[4],
    title: 'Gratitude Without Toxic Positivity',
    theme: 'Acknowledge what is working without denying pain.',
    dailyRead:
      'Forced gratitude can silence legitimate grief. Effective gratitude is specific and honest: “I’m glad you told me you were struggling today. I’m also tired. Both are true.”',
    example:
      'Share one specific appreciation and one specific difficulty — no “but” between them.',
    practice: 'Send a two-sentence note: appreciation + reality.',
    reflection: 'Did dual truth-telling feel more intimate than cheerleading?',
    evidenceNote: 'Authentic stress expression within supportive dyadic coping predicts better outcomes.',
    sourceIds: ['bertschi-2023'],
  },
  {
    day: 30,
    phase: 4,
    phaseTitle: phaseTitles[4],
    title: 'The Sustainable Partnership',
    theme: 'Lock in trust, independence, and quiet devotion.',
    dailyRead:
      'You have spent 30 days shifting from tension toward security: separating self-worth from symptoms, lowering pressure, rebuilding safe touch, communicating with clarity, and planning for the long arc. Connection is built in micro-moments of trust — not forced grand gestures.',
    example:
      'See a quiet evening as peaceful co-existence between two strong people, not proof of failure.',
    practice:
      'Write three things you respect about yourself for navigating this month. Leave a simple “I’m glad we’re a team” note.',
    reflection: 'Notice relief, self-mastery, and a rhythm you can sustain.',
    evidenceNote: 'Long-term couple resilience combines individual wellbeing, dyadic coping, and timely professional care.',
    sourceIds: ['bertschi-2023', 'cochrane-couple-therapy'],
  },
];

export const totalDays = curriculum.length;

export function getDay(day: number): DayContent | undefined {
  return curriculum.find((entry) => entry.day === day);
}

export function getPhaseDays(phase: DayContent['phase']): DayContent[] {
  return curriculum.filter((entry) => entry.phase === phase);
}

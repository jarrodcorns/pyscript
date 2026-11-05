import type { LearnArticle } from '../types';

export const learnArticles: LearnArticle[] = [
  {
    id: 'depression-and-marriage',
    eyebrow: 'Relationship science',
    title: 'When depression moves into a marriage',
    summary:
      'Depression is not only an individual illness. Research consistently shows it reshapes communication, closeness, and the wellbeing of both partners.',
    readingMinutes: 6,
    sections: [
      {
        heading: 'The “we-disease” lens',
        body:
          'A 2023 systematic review of 60 studies concluded that mental health struggles in one partner affect both people in the relationship. Positive dyadic coping — naming stress together, staying supportive without taking over — is linked to better outcomes for individuals and the couple. Negative coping — criticism, withdrawal, or hostile “help” — tends to worsen distress on both sides.',
      },
      {
        heading: 'What partners often feel',
        body:
          'Spouses frequently report caregiver burden: emotional exhaustion, loneliness, hypervigilance, and confusion about whether distance means rejection. Withdrawal, irritability, and low energy from depression can be misread as loss of love. That misread is one of the most painful — and most common — dynamics in these marriages.',
      },
      {
        heading: 'What helps (without playing therapist)',
        body:
          'Evidence supports reducing performance pressure, protecting your own wellbeing, and rebuilding trust in small, consent-based moments. Couple therapy can help when distress is high, especially when relationship conflict and depression reinforce each other. This app is educational support — not a substitute for licensed care.',
      },
    ],
    keyPoints: [
      'Depression affects the couple system, not just one person.',
      'Partner distress is real and deserves support.',
      'Small, pressure-free connection beats forced “fixing.”',
      'Professional help is appropriate when symptoms are severe or safety is at risk.',
    ],
    sourceIds: ['bertschi-2023', 'who-depression-2025', 'caregiver-burden-2026', 'cochrane-couple-therapy'],
  },
  {
    id: 'anxiety-and-distance',
    eyebrow: 'Anxiety patterns',
    title: 'Anxiety, avoidance, and the quiet drift apart',
    summary:
      'Anxiety can shrink a relationship from the inside: less disclosure, more conflict avoidance, and touch that starts to feel risky rather than comforting.',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Why closeness can feel threatening',
        body:
          'In social and generalized anxiety, fear of negative evaluation often leads to less emotional disclosure, more reassurance-seeking, or protective withdrawal. Partners may experience this as distance, unpredictability, or “walking on eggshells.” Research links higher anxiety to lower relationship satisfaction for both partners — not because love disappeared, but because the nervous system is prioritizing safety over connection.',
      },
      {
        heading: 'The connection loop',
        body:
          'When one partner anxiously monitors mood (“Are you okay? What’s wrong?”), the other may feel evaluated rather than supported. When the anxious partner withdraws to avoid burdening the relationship, the spouse may feel abandoned. Breaking this loop usually requires lower-pressure communication and predictable rituals rather than big emotional confrontations.',
      },
    ],
    keyPoints: [
      'Anxiety-driven withdrawal is often protective, not personal rejection.',
      'Monitoring and interrogating usually increase tension.',
      'Predictable, low-stakes contact rebuilds safety.',
    ],
    sourceIds: ['social-anxiety-relationships', 'bertschi-2023'],
  },
  {
    id: 'ssris-libido-connection',
    eyebrow: 'Medication & intimacy',
    title: 'SSRIs, SNRIs, and what they can do to desire and closeness',
    summary:
      'Antidepressants can help mood — and they can also affect sexual function and emotional responsiveness. Understanding the difference between illness, medication, and relationship strain matters.',
    readingMinutes: 8,
    sections: [
      {
        heading: 'How common are sexual side effects?',
        body:
          'Sexual dysfunction is one of the most common reasons people stop antidepressants. Reviews and clinical sources commonly cite prevalence ranges of roughly 25–70% depending on drug, dose, sex, and how questions are asked. SSRIs and SNRIs are most often implicated. Effects can include reduced libido, delayed orgasm, erectile difficulties, reduced genital sensation, and lower sexual satisfaction. Women are often under-screened for these effects even when they are highly affected.',
      },
      {
        heading: 'Emotional blunting vs. residual depression',
        body:
          'Some patients describe feeling emotionally “flat” on medication — less joy, less grief, less sexual or romantic spark. Researchers debate how much of this is a medication side effect versus incomplete depression recovery. The practical point for couples: if your partner seems less present, it may be illness, medication, exhaustion, or a combination. Do not diagnose which. Encourage an open conversation with their prescriber instead.',
      },
      {
        heading: 'After stopping — persistence is possible',
        body:
          'Regulators in Europe, Canada, Australia, and elsewhere have updated labels to acknowledge that sexual dysfunction can persist after stopping SSRIs/SNRI in some people. U.S. labeling is more limited and evolving. This is not an argument against treatment; it is a reason to report symptoms early and involve medical professionals in any medication changes.',
      },
      {
        heading: 'What partners can do — and what not to do',
        body:
          'Do: normalize the conversation, reduce sexual pressure, separate “attraction to me” from “capacity for arousal right now,” and support medical follow-up. Do not: suggest stopping or changing doses, frame medication as the enemy, or treat low libido as proof the relationship is over. Intimacy often needs to be rebuilt from non-sexual safety first.',
      },
    ],
    keyPoints: [
      'Sexual side effects are common and under-discussed.',
      'Emotional flatness may be medication, illness, or both.',
      'Never stop or adjust psychiatric medication without medical guidance.',
      'Pressure usually worsens avoidance; safety rebuilds desire.',
    ],
    sourceIds: [
      'uptodate-ssri-sexual',
      'ssri-meta-2026',
      'nhs-antidepressants',
      'nice-ng222',
      'emotional-blunting-review',
      'ema-pssd-2019',
    ],
  },
  {
    id: 'rebuilding-touch-safely',
    eyebrow: 'Intimacy without pressure',
    title: 'Rebuilding physical closeness when touch feels loaded',
    summary:
      'When illness or medication reduces desire, any touch can start to feel like a demand. The repair path is consent, brevity, and explicit “no strings attached.”',
    readingMinutes: 4,
    sections: [
      {
        heading: 'Why touch becomes threatening',
        body:
          'If intimacy has been declining, the lower-desire partner may brace for negotiation every time there is affection. That bracing shuts down connection further. Research on dyadic coping and clinical guidance on antidepressant sexual effects both point toward the same practical principle: remove performance expectations before trying to restore sexual intimacy.',
      },
      {
        heading: 'Micro-touch that rebuilds trust',
        body:
          'Short, bounded contact works better than ambiguous affection that might escalate. A 10-second hand hold. A shoulder squeeze with eye contact and a smile. A foot rub with an explicit time limit and no expectation of sex. The goal is to teach the nervous system that touch can be safe again.',
      },
    ],
    keyPoints: [
      'Name the expectation out loud — or remove it entirely.',
      'Short, bounded touch beats ambiguous affection.',
      'Desire often follows safety; rarely the reverse.',
    ],
    sourceIds: ['uptodate-ssri-sexual', 'bertschi-2023'],
  },
];

export function getArticleById(id: string): LearnArticle | undefined {
  return learnArticles.find((article) => article.id === id);
}

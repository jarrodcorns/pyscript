import type { ResearchSource } from '../types';

export const researchSources: ResearchSource[] = [
  {
    id: 'bertschi-2023',
    title: 'Dyadic coping and mental health in couples: A systematic review',
    publisher: 'Clinical Psychology Review',
    year: 2023,
    url: 'https://doi.org/10.1016/j.cpr.2023.102344',
  },
  {
    id: 'who-depression-2025',
    title: 'Depressive disorder (depression) — fact sheet',
    publisher: 'World Health Organization',
    year: 2025,
    url: 'https://www.who.int/news-room/fact-sheets/detail/depression',
  },
  {
    id: 'nice-ng222',
    title: 'Depression in adults: treatment and management',
    publisher: 'NICE',
    year: 2022,
    url: 'https://www.nice.org.uk/guidance/ng222',
  },
  {
    id: 'nhs-antidepressants',
    title: 'Antidepressants — side effects and stopping safely',
    publisher: 'NHS',
    year: 2024,
    url: 'https://www.nhs.uk/medicines/antidepressants/',
  },
  {
    id: 'uptodate-ssri-sexual',
    title: 'Sexual dysfunction caused by SSRIs: clinical features and management',
    publisher: 'UpToDate',
    year: 2026,
    url: 'https://www.uptodate.com/contents/sexual-dysfunction-caused-by-selective-serotonin-reuptake-inhibitors-ssris-management',
  },
  {
    id: 'ssri-meta-2026',
    title: 'Sexual dysfunction associated with SSRIs in adults with depression: meta-analysis',
    publisher: 'European Journal of Clinical Pharmacology',
    year: 2026,
    url: 'https://doi.org/10.1007/s00228-026-04011-z',
  },
  {
    id: 'ema-pssd-2019',
    title: 'EMA review of persistent sexual dysfunction after SSRI/SNRI withdrawal',
    publisher: 'European Medicines Agency',
    year: 2019,
    url: 'https://www.pssdnetwork.org/regulator-statements',
  },
  {
    id: 'cochrane-couple-therapy',
    title: 'Couple therapy for depression',
    publisher: 'Cochrane',
    year: 2018,
    url: 'https://doi.org/10.1002/14651858.cd004188.pub3',
  },
  {
    id: 'caregiver-burden-2026',
    title: 'Caregiver burden among caregivers of patients with depression',
    publisher: 'Frontiers in Psychiatry',
    year: 2026,
    url: 'https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2026.1878799/full',
  },
  {
    id: 'social-anxiety-relationships',
    title: 'Romantic relationship quality for individuals with social anxiety: scoping review',
    publisher: 'Disability and Rehabilitation',
    year: 2022,
    url: 'https://doi.org/10.1080/09638237.2022.2091755',
  },
  {
    id: 'emotional-blunting-review',
    title: 'Can antidepressant use be associated with emotional blunting?',
    publisher: 'Human Psychopharmacology',
    year: 2023,
    url: 'https://doi.org/10.1002/hup.2871',
  },
  {
    id: 'sadag',
    title: 'SADAG — South African crisis and support helplines',
    publisher: 'South African Depression and Anxiety Group',
    year: 2026,
    url: 'https://www.sadag.org/index.php',
  },
];

export function getSourcesByIds(ids: string[]): ResearchSource[] {
  const map = new Map(researchSources.map((source) => [source.id, source]));
  return ids.map((id) => map.get(id)).filter((source): source is ResearchSource => Boolean(source));
}

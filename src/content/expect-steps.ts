export interface ExpectStep {
  id: string
  title: string
  body: string
  icon: string // lucide icon name
}

export const EXPECT_STEPS: ExpectStep[] = [
  {
    id: 'step-1',
    title: 'Deciding to go',
    body: 'You call the clinic or walk in. You do not need a doctor\'s referral at most screening centres. Just show up. Tell them you are there for a breast screening.',
    icon: 'phone',
  },
  {
    id: 'step-2',
    title: 'Checking in',
    body: 'At the front desk, you give your name and fill in a short form. It asks basic questions — your age, whether you have had a screening before. It takes about 5 minutes.',
    icon: 'clipboard',
  },
  {
    id: 'step-3',
    title: 'The examination room',
    body: 'A female health worker will see you in a private room. She will ask you a few questions about how you have been feeling. You can ask her anything — she has answered every question before.',
    icon: 'user',
  },
  {
    id: 'step-4',
    title: 'The physical examination',
    body: 'The health worker will gently check both breasts by hand. She is feeling for any changes. It takes about 10 minutes. It should not hurt. If anything feels uncomfortable, tell her.',
    icon: 'heart',
  },
  {
    id: 'step-5',
    title: 'After the examination',
    body: 'She will tell you what she found — or she will refer you for an ultrasound or mammogram if she wants to look more closely. Most women leave with no concerns. Either way, you will know the next step.',
    icon: 'check-circle',
  },
  {
    id: 'step-6',
    title: 'You are done',
    body: 'The whole visit takes 20 to 40 minutes. You walk out. You have done the thing most women put off for years. That matters.',
    icon: 'star',
  },
]

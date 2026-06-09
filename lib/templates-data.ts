export interface PromptTemplate {
  title: string
  prompt: string
}

export interface TemplateCategory {
  id: string
  label: string
  templates: PromptTemplate[]
}

/** 42 reusable prompt templates across 7 categories. Square brackets mark the parts to customize. */
export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  {
    id: "creative",
    label: "Creative Writing",
    templates: [
      {
        title: "Short story",
        prompt:
          "Write a [genre] short story set in [setting], told from the perspective of [character]. Keep it under [400] words, with a clear beginning, turn, and ending. Tone: [folktale / noir / hopeful].",
      },
      {
        title: "World-building brief",
        prompt:
          "Create a world-building brief for [world name]: geography, political tension, one daily-life detail, and one unresolved mystery. Format as four short sections with headers.",
      },
      {
        title: "Character voice test",
        prompt:
          "Write the same 120-word monologue three times, in three distinct voices: [a weary mentor], [an overconfident rookie], [a quiet observer]. Label each version.",
      },
      {
        title: "Dialogue-only scene",
        prompt:
          "Write a dialogue-only scene between [character A] and [character B] who disagree about [topic]. No narration. End on an unspoken compromise.",
      },
      {
        title: "Constrained poem",
        prompt:
          "Write a [12]-line poem about [subject] that never names it directly. Use concrete imagery only — no abstract nouns.",
      },
      {
        title: "Opening-paragraph critique",
        prompt:
          "Critique the following opening paragraph for pacing, voice, and hook strength. Quote specific phrases, then suggest one rewrite. Text: [paste].",
      },
    ],
  },
  {
    id: "research",
    label: "Research & Analysis",
    templates: [
      {
        title: "Structured comparison",
        prompt:
          "Compare [option A] and [option B] for [use case]. Return a table with criteria rows: cost, learning curve, ecosystem, risks. End with a 2-sentence verdict and a confidence level.",
      },
      {
        title: "Assumption audit",
        prompt:
          "List every assumption hidden in this claim: \"[claim]\". Mark each as testable or untestable, and suggest how to verify the top three.",
      },
      {
        title: "Balanced summary",
        prompt:
          "Summarize the key arguments for and against [topic] in under 250 words. Attribute each argument to its typical proponents and note where the evidence is weakest.",
      },
      {
        title: "Pros, cons, verdict",
        prompt:
          "Give pros, cons, and a final verdict on [decision]. Limit to 5 bullets each, ranked by importance to [stakeholder].",
      },
      {
        title: "Data interpretation",
        prompt:
          "Given these figures: [paste data], describe three trends, one anomaly, and one question the data cannot answer. Avoid speculation beyond the numbers.",
      },
      {
        title: "Steelman both sides",
        prompt:
          "Steelman the strongest case FOR and AGAINST [position] in two 150-word passages, then identify the crux that actually separates them.",
      },
    ],
  },
  {
    id: "coding",
    label: "Coding & Debugging",
    templates: [
      {
        title: "Bug diagnosis",
        prompt:
          "Here is an error and the relevant code: [paste]. List the three most likely root causes in order of probability, the fastest way to confirm each, and the minimal fix.",
      },
      {
        title: "Code review",
        prompt:
          "Review this function for correctness, readability, and edge cases: [paste code]. Point to specific lines, then show a revised version.",
      },
      {
        title: "Refactor plan",
        prompt:
          "Propose a refactor plan for [module description] that can ship in [3] small, independently testable steps. Note the risk of each step.",
      },
      {
        title: "Test generation",
        prompt:
          "Write [unit] tests for this function covering the happy path, boundary values, and one failure mode: [paste code]. Use [framework].",
      },
      {
        title: "Explain code",
        prompt:
          "Explain what this code does as if to a developer new to [language], then list two things that could break under load: [paste code].",
      },
      {
        title: "API design check",
        prompt:
          "Critique this API endpoint design for naming, status codes, and versioning: [describe endpoint]. Suggest a corrected spec.",
      },
    ],
  },
  {
    id: "marketing",
    label: "Marketing & Copy",
    templates: [
      {
        title: "Headline variants",
        prompt:
          "Generate 5 headline variants for [product] aimed at [audience]. Vary the angle: outcome, pain point, curiosity, social proof, urgency. Max 9 words each.",
      },
      {
        title: "Landing-page hero",
        prompt:
          "Write a landing-page hero for [product]: headline (max 8 words), subheadline (max 20 words), and 3 benefit bullets. Tone: plain, confident, no hype words.",
      },
      {
        title: "Onboarding email sequence",
        prompt:
          "Draft a 3-email onboarding sequence for [product]: welcome, activation nudge, social proof. Subject lines plus 80-word bodies. One clear CTA per email.",
      },
      {
        title: "Positioning statement",
        prompt:
          "Write a positioning statement for [product]: for [audience] who [need], unlike [alternative], it [key difference]. Then translate it into one casual sentence.",
      },
      {
        title: "Platform-specific posts",
        prompt:
          "Turn this announcement into 3 platform-specific posts (X, LinkedIn, newsletter blurb): [paste announcement]. Match each platform's tone and length norms.",
      },
      {
        title: "Objection handling",
        prompt:
          "List the top 5 objections [audience] would have to [offer], and write a one-paragraph response to each that concedes what's true before countering.",
      },
    ],
  },
  {
    id: "learning",
    label: "Learning & Teaching",
    templates: [
      {
        title: "Explain to a beginner",
        prompt:
          "Explain [concept] to someone new to the field. Use one everyday analogy, one concrete example, and end with the single most common misconception.",
      },
      {
        title: "Study plan",
        prompt:
          "Build a [4]-week study plan for learning [skill] at [2] hours per week. Each week: a goal, the type of resource to use, and one self-test. Assume no prior background.",
      },
      {
        title: "Quiz generation",
        prompt:
          "Create a 10-question quiz on [topic]: 6 multiple choice, 3 short answer, 1 applied scenario. Include an answer key with one-line explanations.",
      },
      {
        title: "Socratic tutor",
        prompt:
          "Act as a Socratic tutor on [topic]. Ask me one question at a time, adapting to my answers. Never explain directly until I ask or fail twice.",
      },
      {
        title: "Analogy finder",
        prompt:
          "Give three analogies for [concept] drawn from [cooking / sports / city planning], and note where each analogy breaks down.",
      },
      {
        title: "Misconception check",
        prompt:
          "Here is my understanding of [topic]: [paste]. Identify what's right, what's subtly wrong, and what's missing — in that order.",
      },
    ],
  },
  {
    id: "productivity",
    label: "Productivity & Planning",
    templates: [
      {
        title: "Meeting agenda",
        prompt:
          "Draft a [30]-minute meeting agenda to decide [decision]: pre-reads, 3 timed discussion blocks, a decision protocol, and owner assignments.",
      },
      {
        title: "Weekly priorities",
        prompt:
          "Here is my task list: [paste]. Group into Now / Next / Later using impact vs urgency, flag anything delegatable, and identify the one task that unblocks others.",
      },
      {
        title: "One-page project brief",
        prompt:
          "Turn this idea into a one-page project brief: [idea]. Sections: problem, success metric, scope (in/out), risks, first milestone.",
      },
      {
        title: "Decision matrix",
        prompt:
          "Build a weighted decision matrix for choosing between [options] using criteria: [list them, or propose 5]. Show the scoring and how sensitive the result is to the weights.",
      },
      {
        title: "Retrospective",
        prompt:
          "Run a written retrospective on [project]: what worked, what didn't, what we'd change, plus one experiment for the next cycle. Keep each section to 3 bullets.",
      },
      {
        title: "Thread triage",
        prompt:
          "Summarize this thread and draft a reply: [paste]. The reply should confirm decisions, list open questions, and propose the next step in under 120 words.",
      },
    ],
  },
  {
    id: "safety",
    label: "Review & Safety",
    templates: [
      {
        title: "Prompt safety check",
        prompt:
          "Review this prompt for ambiguity, missing context, and potential for harmful or biased output: [paste prompt]. Suggest a safer, clearer rewrite.",
      },
      {
        title: "Fact-check pass",
        prompt:
          "List every factual claim in this text and rate each: well-established / needs source / likely wrong. Text: [paste].",
      },
      {
        title: "Bias scan",
        prompt:
          "Identify framing, selection, and wording bias in this passage: [paste]. Rewrite one paragraph in a neutral register.",
      },
      {
        title: "Privacy scrub",
        prompt:
          "Flag any personal or identifying information in this text and return a redacted version with placeholders: [paste].",
      },
      {
        title: "Source quality rubric",
        prompt:
          "Evaluate this source for reliability: [link or description]. Score authorship, evidence, recency, and incentives from 1–5, with one-line justifications.",
      },
      {
        title: "Pre-publish checklist",
        prompt:
          "Before I publish this, check for: unsupported claims, tone slips, missing caveats, and legal red flags. Return a pass/fix table. Text: [paste].",
      },
    ],
  },
]

export const TEMPLATE_COUNT: number = TEMPLATE_CATEGORIES.reduce(
  (sum, category) => sum + category.templates.length,
  0,
)

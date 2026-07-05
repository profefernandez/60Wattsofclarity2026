export const aiModules = [
  {
    id: 'personalization',
    title: 'AI content personalization hook',
    description: 'Reserved container for audience-aware content modules and adaptive homepage sections.',
    placeholderState: 'pending',
  },
  {
    id: 'smart-forms',
    title: 'Smart form assistance hook',
    description: 'Placeholder for AI-assisted question refinement, prompt suggestions, and intake guidance.',
    placeholderState: 'pending',
  },
  {
    id: 'adaptive-learning',
    title: 'Adaptive tutorial hook',
    description: 'Slot for learning paths that adjust to user confidence, behavior, and progress.',
    placeholderState: 'pending',
  },
];

export function getAiModuleById(moduleId) {
  return aiModules.find((module) => module.id === moduleId) || null;
}

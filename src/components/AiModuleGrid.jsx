import { aiModules } from '../ai/modules.js';

export default function AiModuleGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {aiModules.map((module) => (
        <article
          key={module.id}
          className="rounded-2xl border border-dashed border-[#2ec4b6] p-6 bg-[#0d0d0d]"
          data-ai-module={module.id}
          data-ai-module-state={module.placeholderState}
        >
          <h3 className="type-20 mb-2 text-[#2ec4b6]">{module.title}</h3>
          <p className="text-[#d9d9d9]">{module.description}</p>
        </article>
      ))}
    </div>
  );
}

import { notFound } from "next/navigation";
import { projects, getProject, getNextProject } from "@/lib/projects";
import ProjectView from "@/components/work/ProjectView";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: `${project.title} — ${project.category} by Social Whistles Studio.`,
  };
}

export default function ProjectPage({ params }) {
  const project = getProject(params.slug);
  if (!project) notFound();
  const next = getNextProject(params.slug);
  return <ProjectView project={project} next={next} />;
}

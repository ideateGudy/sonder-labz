import { getProjects } from "@/features/projects/queries";
import { Button } from "@/components/ui/button";
import { Plus, ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function AdminProjectsPage() {
  const projectsList = await getProjects({ platform: "all" });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">
            Projects & Case Studies
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your agency portfolio, platform tags, live URLs, and visibility.
          </p>
        </div>
      </div>

      <div className="rounded-[var(--radius-lg)] border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Platforms</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projectsList.map((p) => (
                <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">
                    <div>{p.title}</div>
                    <div className="text-xs text-muted-foreground font-mono">
                      /work/{p.slug}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {p.platforms.map((plat) => (
                        <span
                          key={plat}
                          className="rounded bg-foreground/5 px-2 py-0.5 text-xs font-mono uppercase"
                        >
                          {plat}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{p.role}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                        p.status === "published"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <a
                        href={`/work/${p.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <span>View</span>
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

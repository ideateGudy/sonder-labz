import { getServices } from "@/features/services/queries";
import { ServiceEditorForm } from "@/components/admin/ServiceEditorForm";

export default async function AdminServicesPage() {
  const serviceList = await getServices();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">
          Service Lines Editor
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update the three core services (Web, Mobile, Desktop), their deliverables, and typical tech stacks.
        </p>
      </div>

      <div className="space-y-8">
        {serviceList.map((service) => (
          <div
            key={service.id}
            className="p-6 md:p-8 rounded-[var(--radius-lg)] border border-border bg-card shadow-sm"
          >
            <ServiceEditorForm service={service} />
          </div>
        ))}
      </div>
    </div>
  );
}

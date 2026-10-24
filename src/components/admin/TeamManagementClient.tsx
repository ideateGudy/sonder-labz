"use client";

import * as React from "react";
import { saveTeamMember, deleteTeamMember } from "@/features/admin/actions";
import { uploadImageAction } from "@/features/admin/upload-actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, ExternalLink, Image as ImageIcon } from "lucide-react";

export function TeamManagementClient({
  initialMembers,
}: {
  initialMembers: any[];
}) {
  const [members, setMembers] = React.useState(initialMembers);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);

  // Form state
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [github, setGithub] = React.useState("");
  const [photoUrl, setPhotoUrl] = React.useState("");

  const [isUploading, setIsUploading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  function openCreateForm() {
    setEditingId(null);
    setName("");
    setRole("");
    setBio("");
    setWebsite("");
    setGithub("");
    setPhotoUrl("");
    setIsFormOpen(true);
  }

  function openEditForm(member: any) {
    setEditingId(member.id);
    setName(member.name);
    setRole(member.role);
    setBio(member.bio);
    setWebsite(member.links?.website || "");
    setGithub(member.links?.github || "");
    setPhotoUrl(member.photoUrl || "");
    setIsFormOpen(true);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadImageAction(formData);
      if (res.ok && res.url) {
        setPhotoUrl(res.url);
        toast.success("Profile picture uploaded to Cloudinary");
      } else {
        toast.error(res.error || "Upload failed");
      }
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSaveMember(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await saveTeamMember(editingId, {
        name,
        role,
        bio,
        website: website || undefined,
        github: github || undefined,
        photoUrl: photoUrl || undefined,
        visible: true,
      });

      if (res.ok) {
        toast.success(
          editingId
            ? `Team member ${name} updated successfully!`
            : `Team member ${name} added successfully!`
        );
        setIsFormOpen(false);
        setEditingId(null);
        window.location.reload();
      } else {
        toast.error("Failed to save team member. Please verify fields.");
      }
    } catch {
      toast.error("Error saving team member.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string, memberName: string) {
    if (!confirm(`Are you sure you want to delete ${memberName}?`)) return;

    try {
      const res = await deleteTeamMember(id);
      if (res.ok) {
        setMembers(members.filter((m) => m.id !== id));
        toast.success(`Team member ${memberName} removed.`);
      } else {
        toast.error("Failed to delete member.");
      }
    } catch {
      toast.error("Error deleting member.");
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">
            Team Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Add or edit team members, upload profile pictures to Cloudinary, and manage public visibility.
          </p>
        </div>
        <Button
          type="button"
          variant="primary"
          onClick={() => {
            if (isFormOpen) {
              setIsFormOpen(false);
              setEditingId(null);
            } else {
              openCreateForm();
            }
          }}
        >
          <Plus className="size-4 mr-1.5" />
          <span>{isFormOpen ? "Cancel" : "Add Team Member"}</span>
        </Button>
      </div>

      {/* Add / Edit Team Member Form */}
      {isFormOpen && (
        <div className="p-6 md:p-8 rounded-[var(--radius-lg)] border border-primary/40 bg-card shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h2 className="text-xl font-bold font-display text-foreground">
              {editingId ? "Edit Team Member" : "New Team Member"}
            </h2>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsFormOpen(false);
                setEditingId(null);
              }}
            >
              Close
            </Button>
          </div>

          <form onSubmit={handleSaveMember} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-[var(--radius-sm)] border border-input bg-background/50 px-3.5 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Role & Specialization *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Mobile Engineer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-[var(--radius-sm)] border border-input bg-background/50 px-3.5 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Short Bio *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Background, core competencies, and passions..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full rounded-[var(--radius-sm)] border border-input bg-background/50 px-3.5 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              />
            </div>

            {/* Profile Picture (Upload to Cloudinary OR Paste Image URL) */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Profile Picture (Cloudinary Upload or Direct Image URL)
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-[var(--radius-sm)] border border-dashed border-border bg-background/30">
                {photoUrl ? (
                  <div className="relative size-16 rounded-full overflow-hidden border-2 border-primary shrink-0">
                    <img
                      src={photoUrl}
                      alt="Uploaded preview"
                      className="size-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "";
                      }}
                    />
                  </div>
                ) : (
                  <div className="size-16 rounded-full border border-border bg-foreground/5 flex items-center justify-center text-muted-foreground shrink-0">
                    <ImageIcon className="size-6" />
                  </div>
                )}

                <div className="flex-1 w-full space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      Option A: Upload Image File (auto-optimised to Cloudinary)
                    </label>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      disabled={isUploading}
                      onChange={handleFileUpload}
                      className="text-xs text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
                    />
                    {isUploading && (
                      <p className="text-[11px] text-primary mt-1">
                        Uploading directly to Cloudinary...
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-border/40">
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      Option B: Or paste an existing Image URL
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/... or https://res.cloudinary.com/..."
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        className="w-full rounded-[var(--radius-sm)] border border-input bg-card px-3 py-1.5 text-xs text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                      />
                      {photoUrl && (
                        <button
                          type="button"
                          onClick={() => setPhotoUrl("")}
                          className="text-xs text-destructive hover:underline shrink-0"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Website / Portfolio URL (optional)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full rounded-[var(--radius-sm)] border border-input bg-background/50 px-3.5 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  GitHub Profile URL (optional)
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="w-full rounded-[var(--radius-sm)] border border-input bg-background/50 px-3.5 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" disabled={isSubmitting || isUploading} variant="primary">
                {isSubmitting ? "Saving..." : editingId ? "Update Team Member" : "Save & Add Team Member"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingId(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Team Roster Table */}
      <div className="rounded-[var(--radius-lg)] border border-border bg-card overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-semibold">Member</th>
              <th className="px-6 py-4 font-semibold">Role</th>
              <th className="px-6 py-4 font-semibold">Bio</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4 font-medium text-foreground">
                  <div className="flex items-center gap-3">
                    {m.photoUrl ? (
                      <div className="size-10 rounded-full overflow-hidden border border-border shrink-0">
                        <img
                          src={m.photoUrl}
                          alt={m.name}
                          className="size-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="size-10 rounded-full border border-border bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                        {m.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="font-bold">{m.name}</div>
                      {m.links?.website && (
                        <a
                          href={m.links.website}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          <span>Portfolio</span>
                          <ExternalLink className="size-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-primary font-medium">{m.role}</td>
                <td className="px-6 py-4 text-muted-foreground max-w-xs truncate">
                  {m.bio}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="inline-flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => openEditForm(m)}
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline transition-colors"
                    >
                      <Edit2 className="size-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(m.id, m.name)}
                      className="inline-flex items-center gap-1 text-xs text-destructive hover:text-destructive/80 transition-colors"
                    >
                      <Trash2 className="size-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

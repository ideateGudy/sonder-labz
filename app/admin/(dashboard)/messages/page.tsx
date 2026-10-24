import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { Mail, Clock } from "lucide-react";

export default async function AdminMessagesPage() {
  let messageList: any[] = [];

  if (db) {
    try {
      messageList = await db
        .select()
        .from(messages)
        .orderBy(desc(messages.createdAt));
    } catch (err) {
      console.error("Failed to query messages:", err);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">
          Messages Inbox
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Submissions received from the public website contact form.
        </p>
      </div>

      {messageList.length === 0 ? (
        <div className="text-center py-16 rounded-[var(--radius-lg)] border border-border bg-card">
          <Mail className="size-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-bold text-foreground">Inbox is empty</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-1">
            When prospective clients submit the contact form, their inquiries will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messageList.map((msg) => (
            <div
              key={msg.id}
              className="p-6 rounded-[var(--radius-lg)] border border-border bg-card space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{msg.name}</h3>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-xs text-primary hover:underline"
                  >
                    {msg.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  {msg.projectType && (
                    <span className="rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs font-mono uppercase">
                      {msg.projectType}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3" />
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                {msg.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import EditorView from "@/components/EditorView";

export default function EditEntryPage({
  params,
}: {
  params: { id: string };
}) {
  return <EditorView entryId={params.id} />;
}

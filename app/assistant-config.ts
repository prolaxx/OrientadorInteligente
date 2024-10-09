export let assistantId: string = ""; // set your assistant ID here

if (assistantId === "") {
    assistantId = process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID || ""; // Usa un valor vacío como valor por defecto
}

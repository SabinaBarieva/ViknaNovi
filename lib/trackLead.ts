export function trackLead(formName: string) {
  if (typeof window === "undefined") return;

  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({
    event: "generate_lead",
    form_name: formName,
  });
}

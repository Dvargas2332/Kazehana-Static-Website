import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Check, CircleCheck, LoaderCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type LeadKind = "demo" | "waitlist" | "whatsapp";

const content = {
  demo: {
    label: "DEMOSTRACIÓN PERSONALIZADA",
    title: "Veamos Kaze Hana en tu operación.",
    description: "Cuéntanos lo básico de tu operación y coordinaremos una demostración contigo.",
    submit: "Solicitar demostración",
    success: "Tu solicitud de demo está registrada.",
    successCopy: "Gracias por tu interés. Ya tenemos tus datos para coordinar la demostración.",
  },
  waitlist: {
    label: "ACCESO ANTICIPADO",
    title: "Sé de los primeros en entrar.",
    description: "Déjanos tus datos y te mantendremos al tanto del lanzamiento y la etapa inicial.",
    submit: "Unirme a la lista",
    success: "Ya estás en la lista de espera.",
    successCopy: "Hemos guardado tu registro. Te contactaremos con las novedades de Kaze Hana Cloud.",
  },
  whatsapp: {
    label: "CONTACTO POR WHATSAPP",
    title: "Conversemos por WhatsApp.",
    description: "Déjanos tu número y tu consulta. Te contactaremos por WhatsApp para continuar la conversación.",
    submit: "Solicitar contacto",
    success: "Tu solicitud está registrada.",
    successCopy: "Gracias. Usaremos el número indicado para contactarte por WhatsApp.",
  },
};

export function LeadDialog({
  kind,
  open,
  prefill,
  onOpenChange,
}: {
  kind: LeadKind;
  open: boolean;
  prefill?: { message?: string };
  onOpenChange: (open: boolean) => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const copy = content[kind];
  const createLead = trpc.leads.create.useMutation();

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setError("");
      createLead.reset();
    }
    // Reset only when a new dialog session starts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, kind]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    const roomsValue = String(data.get("rooms") || "");
    if (data.get("consent") !== "on") {
      setError("Necesitamos tu autorización para registrar la solicitud.");
      return;
    }
    createLead.mutate(
      {
        kind,
        name: String(data.get("name") || ""),
        email: kind !== "whatsapp" ? String(data.get("email") || "") : undefined,
        phone: kind === "whatsapp" ? String(data.get("phone") || "") : undefined,
        propertyName: kind === "demo" ? String(data.get("propertyName") || "") : undefined,
        rooms: kind === "demo" && roomsValue ? Number(roomsValue) : undefined,
        message: kind !== "waitlist" ? String(data.get("message") || "") : undefined,
        consent: true,
      },
      {
        onSuccess: () => setSubmitted(true),
        onError: () => setError("No pudimos guardar la solicitud. Revisa los datos e inténtalo de nuevo."),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lead-dialog">
        {submitted ? (
          <div className="form-success">
            <span className="success-icon"><CircleCheck size={28} /></span>
            <span className="dialog-label">SOLICITUD RECIBIDA</span>
            <DialogTitle>{copy.success}</DialogTitle>
            <DialogDescription>{copy.successCopy}</DialogDescription>
            <button className="button button--primary" type="button" onClick={() => onOpenChange(false)}>
              Cerrar <Check size={17} />
            </button>
          </div>
        ) : (
          <>
            <DialogHeader className="dialog-header">
              <span className="dialog-label">{copy.label}</span>
              <DialogTitle>{copy.title}</DialogTitle>
              <DialogDescription>{copy.description}</DialogDescription>
            </DialogHeader>
            <form className="lead-form" onSubmit={handleSubmit}>
              <div className="field field--full">
                <label htmlFor={`lead-name-${kind}`}>Nombre</label>
                <input id={`lead-name-${kind}`} name="name" autoComplete="name" required minLength={2} maxLength={120} placeholder="Tu nombre" />
              </div>
              {kind !== "whatsapp" ? (
                <div className="field field--full">
                  <label htmlFor={`lead-email-${kind}`}>Correo electrónico</label>
                  <input id={`lead-email-${kind}`} name="email" type="email" autoComplete="email" required maxLength={320} placeholder="tu@correo.com" />
                </div>
              ) : (
                <div className="field field--full">
                  <label htmlFor={`lead-phone-${kind}`}>Número de WhatsApp</label>
                  <input id={`lead-phone-${kind}`} name="phone" type="tel" autoComplete="tel" required minLength={8} maxLength={40} placeholder="Incluye el código de país" />
                </div>
              )}
              {kind === "demo" && (
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="lead-property">Alojamiento o restaurante <span>(opcional)</span></label>
                    <input id="lead-property" name="propertyName" autoComplete="organization" maxLength={160} placeholder="Nombre del alojamiento o restaurante" />
                  </div>
                  <div className="field">
                    <label htmlFor="lead-rooms">Habitaciones <span>(opcional)</span></label>
                    <input id="lead-rooms" name="rooms" type="number" inputMode="numeric" min={1} max={2000} placeholder="Ej. 24" />
                  </div>
                </div>
              )}
              {kind !== "waitlist" && (
                <div className="field field--full">
                  <label htmlFor={`lead-message-${kind}`}>Mensaje <span>(opcional)</span></label>
                  <textarea id={`lead-message-${kind}`} name="message" rows={3} maxLength={1200} defaultValue={prefill?.message} placeholder={kind === "demo" ? "¿Qué te gustaría resolver con la suite?" : "¿En qué podemos ayudarte?"} />
                </div>
              )}
              <label className="consent-row">
                <input type="checkbox" name="consent" required />
                <span>Acepto que Kaze Hana Cloud use estos datos únicamente para responder a mi solicitud.</span>
              </label>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="button button--primary form-submit" type="submit" disabled={createLead.isPending}>
                {createLead.isPending ? <><LoaderCircle className="spin" size={18} /> Guardando solicitud…</> : <>{copy.submit} <ArrowRight size={18} /></>}
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

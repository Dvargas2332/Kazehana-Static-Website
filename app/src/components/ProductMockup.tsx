import {
  Bell,
  BedDouble,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Check,
  ChevronDown,
  ClipboardCheck,
  LayoutDashboard,
  Search,
  UtensilsCrossed,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ProductView = "overview" | "reservation" | "restaurant" | "stay" | "insight";

const arrivals = [
  { initials: "MG", name: "Marina González", room: "204 · Doble", time: "14:30", tone: "coral" },
  { initials: "JP", name: "Javier Pérez", room: "108 · Suite", time: "15:00", tone: "blue" },
  { initials: "AL", name: "Ana Lucero", room: "302 · Doble", time: "16:15", tone: "gold" },
];

function Overview() {
  return (
    <>
      <div className="mock-heading">
        <div>
          <span className="mock-overline">BUENOS DÍAS, LAURA</span>
          <h3>Todo listo para hoy.</h3>
        </div>
        <span className="mock-date">18 SEP · VIE</span>
      </div>
      <div className="metric-row">
        <div className="metric">
          <span>Ocupación</span>
          <strong>82%</strong>
          <small><i className="up-dot" /> 6% esta semana</small>
        </div>
        <div className="metric">
          <span>Llegadas</span>
          <strong>08</strong>
          <small>3 por confirmar</small>
        </div>
        <div className="metric">
          <span>Salidas</span>
          <strong>05</strong>
          <small>Antes de las 12:00</small>
        </div>
      </div>
      <div className="mock-grid">
        <div className="occupancy-panel">
          <div className="panel-title"><span>Ocupación semanal</span><strong>82%</strong></div>
          <div className="bar-chart" aria-hidden="true">
            {[48, 65, 57, 78, 88, 94, 82].map((height, index) => (
              <div className="bar-item" key={index}>
                <span className={cn("bar", index === 5 && "bar--active")} style={{ height: `${height}%` }} />
                <small>{["L", "M", "X", "J", "V", "S", "D"][index]}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="arrivals-panel">
          <div className="panel-title"><span>Próximas llegadas</span><span className="text-link">Ver todas</span></div>
          {arrivals.map((guest) => (
            <div className="guest-row" key={guest.name}>
              <span className={`guest-avatar guest-avatar--${guest.tone}`}>{guest.initials}</span>
              <span className="guest-info"><strong>{guest.name}</strong><small>{guest.room}</small></span>
              <time>{guest.time}</time>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Reservation() {
  const bookings = [
    ["Marina González", "18–21 sep", "204", "Confirmada"],
    ["Javier Pérez", "18–20 sep", "108", "Confirmada"],
    ["Ana Lucero", "19–22 sep", "302", "Pendiente"],
    ["Tomás Ruiz", "20–24 sep", "201", "Confirmada"],
  ];
  return (
    <>
      <div className="mock-heading">
        <div><span className="mock-overline">RECEPCIÓN</span><h3>Reservas</h3></div>
        <span className="mock-action">+ Nueva reserva</span>
      </div>
      <div className="reservation-summary">
        <span><strong>24</strong> activas</span><span><strong>08</strong> llegan hoy</span><span><strong>03</strong> pendientes</span>
      </div>
      <div className="booking-table">
        <div className="booking-row booking-row--head"><span>Huésped</span><span>Estancia</span><span>Hab.</span><span>Estado</span></div>
        {bookings.map((booking) => (
          <div className="booking-row" key={booking[0]}>
            <span><i className="booking-dot" />{booking[0]}</span><span>{booking[1]}</span><span>{booking[2]}</span>
            <span><b className={booking[3] === "Pendiente" ? "status status--pending" : "status"}>{booking[3]}</b></span>
          </div>
        ))}
      </div>
    </>
  );
}

function Restaurant() {
  const orders = [
    ["12", "2 comandas", "$86.40", "En cocina"],
    ["07", "1 comanda", "$42.10", "Servida"],
    ["15", "3 comandas", "$128.50", "Cobrando"],
    ["03", "1 comanda", "$18.00", "Servida"],
  ];
  return (
    <>
      <div className="mock-heading">
        <div><span className="mock-overline">RESTAURANTE</span><h3>Servicio de sala</h3></div>
        <span className="mock-action">+ Nueva comanda</span>
      </div>
      <div className="reservation-summary">
        <span><strong>14</strong> mesas activas</span><span><strong>06</strong> en cocina</span><span><strong>$42</strong> ticket medio</span>
      </div>
      <div className="booking-table">
        <div className="booking-row booking-row--head"><span>Mesa</span><span>Comanda</span><span>Total</span><span>Estado</span></div>
        {orders.map((order) => (
          <div className="booking-row" key={order[0]}>
            <span><i className="booking-dot" />{order[0]}</span><span>{order[1]}</span><span>{order[2]}</span>
            <span><b className={order[3] === "En cocina" ? "status status--pending" : "status"}>{order[3]}</b></span>
          </div>
        ))}
      </div>
    </>
  );
}

function Stay() {
  const tasks = [
    { room: "204", label: "Limpieza de salida", person: "Marta", done: true },
    { room: "108", label: "Preparar llegada", person: "Elena", done: true },
    { room: "302", label: "Revisión de amenities", person: "Marta", done: false },
    { room: "201", label: "Limpieza de estancia", person: "Sin asignar", done: false },
  ];
  return (
    <>
      <div className="mock-heading">
        <div><span className="mock-overline">OPERACIÓN</span><h3>Habitaciones</h3></div>
        <span className="mock-date">ACTUALIZADO AHORA</span>
      </div>
      <div className="room-status-row">
        <span><i className="room-dot room-dot--clean" /><strong>12</strong> listas</span>
        <span><i className="room-dot room-dot--progress" /><strong>04</strong> en proceso</span>
        <span><i className="room-dot room-dot--dirty" /><strong>03</strong> pendientes</span>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <div className={cn("task-row", task.done && "task-row--done")} key={task.room}>
            <span className="task-check">{task.done && <Check size={13} />}</span>
            <strong className="task-room">{task.room}</strong>
            <span className="task-label">{task.label}</span>
            <small>{task.person}</small>
          </div>
        ))}
      </div>
    </>
  );
}

function Insight() {
  return (
    <>
      <div className="mock-heading">
        <div><span className="mock-overline">DIRECCIÓN</span><h3>Pulso del negocio</h3></div>
        <span className="mock-date">ESTE MES <ChevronDown size={12} /></span>
      </div>
      <div className="insight-hero">
        <span>Ingresos del mes</span><strong>$48,320</strong><small><i className="up-dot" /> 12.4% frente al mes anterior</small>
        <div className="line-chart" aria-hidden="true">
          <svg viewBox="0 0 500 130" preserveAspectRatio="none">
            <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#15996e" stopOpacity=".28"/><stop offset="100%" stopColor="#15996e" stopOpacity="0"/></linearGradient></defs>
            <path d="M0 112 C45 100,60 76,100 83 S160 100,200 67 S265 74,300 48 S365 58,400 30 S460 30,500 12 L500 130 L0 130Z" fill="url(#area)" />
            <path d="M0 112 C45 100,60 76,100 83 S160 100,200 67 S265 74,300 48 S365 58,400 30 S460 30,500 12" fill="none" stroke="#15996e" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div className="channel-row"><span>Web directa <strong>46%</strong></span><span>Agencias <strong>38%</strong></span><span>Otros <strong>16%</strong></span></div>
    </>
  );
}

export function ProductMockup({ view = "overview", className }: { view?: ProductView; className?: string }) {
  return (
    <div className={cn("pms-window", className)} role="img" aria-label="Vista ilustrativa del panel de Kaze Hana Cloud">
      <div className="window-chrome">
        <span className="chrome-dots"><i /><i /><i /></span>
        <span className="chrome-title">app.kazehanacloud.com</span>
        <span className="demo-tag">DEMO</span>
      </div>
      <div className="pms-app">
        <aside className="app-rail" aria-hidden="true">
          <img className="mini-brand" src="/brand/kazehana-cloud.svg" alt="" aria-hidden="true" />
          <span className={cn("rail-icon", view === "overview" && "rail-icon--active")}><LayoutDashboard size={17} /></span>
          <span className={cn("rail-icon", view === "reservation" && "rail-icon--active")}><CalendarDays size={17} /></span>
          <span className={cn("rail-icon", view === "stay" && "rail-icon--active")}><BedDouble size={17} /></span>
          <span className={cn("rail-icon", view === "restaurant" && "rail-icon--active")}><UtensilsCrossed size={17} /></span>
          <span className={cn("rail-icon", view === "insight" && "rail-icon--active")}><ChartNoAxesColumnIncreasing size={17} /></span>
          <span className="rail-spacer" />
          <span className="rail-icon"><ClipboardCheck size={17} /></span>
        </aside>
        <div className="app-main">
          <div className="app-topbar">
            <span className="search-mock"><Search size={13} /> Buscar reservas o huéspedes</span>
            <span className="topbar-right"><Bell size={15} /><i className="notification-dot" /><b>LM</b></span>
          </div>
          <div className="app-content">
            {view === "overview" && <Overview />}
            {view === "reservation" && <Reservation />}
            {view === "restaurant" && <Restaurant />}
            {view === "stay" && <Stay />}
            {view === "insight" && <Insight />}
          </div>
        </div>
      </div>
    </div>
  );
}

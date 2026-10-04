import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useRef, useState, type MutableRefObject } from 'react';

export type ToolDockItem = {
  label: string;
  icon: string;
  background: string;
  invert?: boolean;
  scale?: number;
};

type Layout = { centers: number[]; width: number };

const TILT = [-5, 4, -3, 5, -4, 3, -5, 4, -2, 5, -3];
const SPRING = { stiffness: 500, damping: 38, mass: 0.5 };
const REACH = 1.35;

function swellAt(layout: Layout, index: number, pointerX: number) {
  const center = layout.centers[index];
  if (!Number.isFinite(pointerX) || center === undefined || !layout.width) return 0;
  return Math.max(0, 1 - Math.abs(pointerX - center) / layout.width / REACH) ** 2;
}

function useStaticDock() {
  const reducedMotion = useReducedMotion() ?? false;
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 780px), (hover: none)');
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reducedMotion || compact;
}

function DockTile({ item, index, count, pointer, layout, still }: {
  item: ToolDockItem;
  index: number;
  count: number;
  pointer: MotionValue<number>;
  layout: MutableRefObject<Layout>;
  still: boolean;
}) {
  const near = useTransform(pointer, (x) => still ? 0 : swellAt(layout.current, index, x));
  const push = useTransform(pointer, (x) => {
    if (still) return 0;
    let shift = 0;
    for (let position = 0; position < count; position += 1) {
      if (position !== index) shift += swellAt(layout.current, position, x) * (position < index ? 1 : -1);
    }
    return shift * layout.current.width * 0.18;
  });
  const swell = useSpring(near, SPRING);
  const x = useSpring(push, SPRING);
  const scale = useTransform(swell, (value) => 1 + value * 0.22);
  const y = useTransform(swell, (value) => -value * 10);
  const rotate = useTransform(swell, (value) => still ? 0 : TILT[index % TILT.length] * (1 - value));

  return (
    <motion.li
      className="support-tool-slot"
      style={{ zIndex: count - index, marginLeft: index === 0 ? 0 : 'calc(var(--support-dock-size) * -0.08)' }}
      initial={still ? false : { opacity: 0, y: 10, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: still ? 0 : 0.5, delay: still ? 0 : index * 0.035 }}
    >
      <motion.div className="support-tool-tile" style={{ x, y, scale, rotate, background: item.background }} role="img" aria-label={item.label}>
        <img
          className={`support-tool-mark${item.invert ? ' is-inverted' : ''}`}
          src={item.icon}
          alt=""
          draggable={false}
          style={item.scale ? { width: `${item.scale}%`, height: `${item.scale}%` } : undefined}
        />
      </motion.div>
    </motion.li>
  );
}

export function ToolDock({ items }: { items: ToolDockItem[] }) {
  const rail = useRef<HTMLUListElement>(null);
  const layout = useRef<Layout>({ centers: [], width: 0 });
  const pointer = useMotionValue(Number.POSITIVE_INFINITY);
  const still = useStaticDock();
  const [active, setActive] = useState<number | null>(null);
  const [tooltipX, setTooltipX] = useState(0);

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const measure = () => {
      const slots = Array.from(element.children) as HTMLElement[];
      layout.current = {
        centers: slots.map((slot) => slot.offsetLeft + slot.offsetWidth / 2),
        width: slots[0]?.offsetWidth ?? 0,
      };
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [items.length]);

  const track = (clientX: number) => {
    if (still || !rail.current) return;
    const x = clientX - rail.current.getBoundingClientRect().left;
    pointer.set(x);
    const nearest = layout.current.centers.reduce((best, center, index, centers) =>
      Math.abs(x - center) < Math.abs(x - centers[best]) ? index : best, 0);
    setActive(nearest);
    setTooltipX(layout.current.centers[nearest] ?? 0);
  };

  const release = () => {
    pointer.set(Number.POSITIVE_INFINITY);
    setActive(null);
  };

  return (
    <div className="supporting-tools-dock">
      <div className="supporting-tools-stage" tabIndex={still ? 0 : undefined} role="region" aria-label="Connected apps">
        <span className={`support-tool-tooltip ${active === null ? '' : 'is-visible'}`} style={{ left: tooltipX }} aria-hidden="true">
          {active === null ? '' : items[active].label}
        </span>
        <ul
          ref={rail}
          className="supporting-tools-list"
          aria-label="Supporting tools and platforms"
          onPointerMove={(event) => track(event.clientX)}
          onPointerLeave={release}
          onPointerCancel={release}
        >
          {items.map((item, index) => (
            <DockTile key={item.label} item={item} index={index} count={items.length} pointer={pointer} layout={layout} still={still} />
          ))}
        </ul>
      </div>
    </div>
  );
}

import * as Tabs from '@radix-ui/react-tabs';
import { ArrowUpRight, CalendarCheck2, Check, ChevronDown, ClipboardList, Mail, MessageSquare, Phone, ShieldCheck } from 'lucide-react';
import availability from '@/assets/workflows/clearnest-availability.png';
import booking from '@/assets/workflows/clearnest-booking.png';
import messages from '@/assets/workflows/clearnest-messages.png';
import './clearnest.css';

const loomId = 'c0b16a31fe1941b9b3383aaf30f06e1f';
const loomUrl = `https://www.loom.com/share/${loomId}`;

const flows = [
  {
    number: '01', title: 'Find a time that works', image: availability,
    description: 'Alex checks the owner’s calendar and offers up to 3 available times for a 15-minute phone call.',
    benefit: 'The caller can choose a time during the conversation. The owner has less back-and-forth to handle before they can discuss the job.',
    alt: 'Availability workflow: receive the request, check the owner’s calendar and return available callback times.',
  },
  {
    number: '02', title: 'Book the callback after approval', image: booking,
    description: 'Alex reads back the details and asks for approval. The workflow checks the time again, saves the callback and checks that it appears in the calendar before confirming.',
    benefit: 'The inquiry becomes a scheduled next step, with the customer’s details attached. The owner can prepare for the call without retyping the request.',
    alt: 'Booking workflow: check the caller’s approval and chosen time, save the callback, confirm it and request an owner notification.',
  },
  {
    number: '03', title: 'Give the owner the full picture', image: messages,
    description: 'Booking summaries and caller messages are saved in a shared call log. The owner receives an email with the name, phone number and request.',
    benefit: 'The owner can follow up with context instead of piecing the conversation together. Questions that need a person are captured for their attention.',
    alt: 'Message workflow: save the request, check it was saved, email the owner and record the email result.',
  },
];

const outcomes = [
  {
    id: 'callback', label: 'A callback is booked',
    lead: 'The caller chooses a time and agrees to the details. Here is what the owner gets:',
    items: [
      { icon: CalendarCheck2, title: 'A time in the calendar', detail: 'A 15-minute phone callback, with the caller’s details attached.', value: 'A clear next step for the inquiry.' },
      { icon: ClipboardList, title: 'A saved customer request', detail: 'Contact details and cleaning needs recorded in the call log.', value: 'Less copying after the conversation.' },
      { icon: Mail, title: 'An email ready to act on', detail: 'The callback details and customer’s request sent to the owner.', value: 'Context before picking up the phone.' },
    ],
  },
  {
    id: 'message', label: 'A caller leaves a message',
    lead: 'The caller has a question for the owner and does not need a booked time:',
    items: [
      { icon: MessageSquare, title: 'The question captured', detail: 'Alex collects the name, callback number and message, then asks for approval.', value: 'The caller’s request is clear.' },
      { icon: ClipboardList, title: 'A record to refer to', detail: 'The message is saved in the call log and checked before Alex confirms.', value: 'The owner can review it later.' },
      { icon: Mail, title: 'The owner informed', detail: 'An email brings the caller’s question and contact details together.', value: 'Follow-up starts with the right context.' },
    ],
  },
];

export default function ClearNestCaseStudy() {
  return <div className="clearnest-case">
    <section className="clearnest-intro" aria-labelledby="clearnest-outcome">
      <div className="clearnest-intro-copy">
        <span className="card-kicker">FROM CUSTOMER CALL TO OWNER FOLLOW-UP</span>
        <h2 id="clearnest-outcome">A booked callback.<br /><em>An owner ready to help.</em></h2>
        <p>Alex handles the first conversation so a busy cleaning business owner gets a scheduled callback or a clear message, with the customer’s details ready.</p>
        <p className="clearnest-callback"><Phone size={18} aria-hidden="true" /><span>A <strong>callback</strong> is a phone call from the owner to discuss the cleaning job and price.</span></p>
      </div>
      <figure className="clearnest-video" aria-label="ClearNest video demonstration">
        <div className="clearnest-video-frame">
          <iframe src={`https://www.loom.com/embed/${loomId}?hideEmbedTopBar=true`} title="ClearNest AI receptionist demonstration by Chester Wapanio" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        </div>
        <figcaption><span>Recorded walkthrough · Sample customer details</span><a href={loomUrl} target="_blank" rel="noreferrer">Open in Loom <ArrowUpRight size={15} aria-hidden="true" /></a></figcaption>
      </figure>
    </section>

    <section className="clearnest-section" aria-labelledby="clearnest-results">
      <span className="card-kicker">WHAT THE BUSINESS GETS</span>
      <h2 id="clearnest-results">The conversation ends.<br />The details are ready.</h2>
      <p>Choose an outcome to see what the owner receives.</p>
      <Tabs.Root defaultValue="callback" className="clearnest-outcomes">
        <Tabs.List className="clearnest-tabs" aria-label="Explore call outcomes">{outcomes.map(outcome => <Tabs.Trigger key={outcome.id} value={outcome.id}>{outcome.label}</Tabs.Trigger>)}</Tabs.List>
        {outcomes.map(outcome => <Tabs.Content value={outcome.id} key={outcome.id} className="clearnest-result-panel">
          <p>{outcome.lead}</p>
          <div className="clearnest-result-grid">{outcome.items.map(item => <article key={item.title}>
            <item.icon size={23} aria-hidden="true" /><h3>{item.title}</h3><p>{item.detail}</p><strong><Check size={15} aria-hidden="true" />{item.value}</strong>
          </article>)}</div>
        </Tabs.Content>)}
      </Tabs.Root>
      <p className="clearnest-fine-print">Based on tests with sample calls. Time savings and revenue gains have not been measured.</p>
    </section>

    <section className="clearnest-section" aria-labelledby="clearnest-workflows">
      <span className="card-kicker">HOW I BUILT IT</span>
      <h2 id="clearnest-workflows">3 connected workflows. One clear follow-up.</h2>
      <p>Open any step for a short explanation and the original workflow.</p>
      <div className="clearnest-flow-list">{flows.map(flow => <details className="clearnest-flow" key={flow.number}>
        <summary><span className="clearnest-flow-number">{flow.number}</span><h3>{flow.title}</h3><ChevronDown size={19} aria-hidden="true" /></summary>
        <div className="clearnest-flow-content">
          <div className="clearnest-flow-copy"><div><h4>What happens</h4><p>{flow.description}</p></div><div><h4>Why it helps</h4><p>{flow.benefit}</p></div></div>
          <a className="clearnest-diagram" href={flow.image} target="_blank" rel="noreferrer"><img src={flow.image} alt={flow.alt} loading="lazy" /><span>Open full-size workflow {flow.number}<ArrowUpRight size={17} aria-hidden="true" /></span></a>
        </div>
      </details>)}</div>
    </section>

    <div className="clearnest-more">
    <details className="clearnest-extra"><summary><ShieldCheck size={20} aria-hidden="true" /><span>What was checked?</span><ChevronDown size={17} aria-hidden="true" /></summary><div><p>Sample-call tests confirmed calendar bookings, saved requests and owner emails. In another test, “not yet” paused the action until the caller approved. Alex only confirms success after the connected tools report it.</p></div></details>
    <details className="clearnest-extra"><summary><ClipboardList size={20} aria-hidden="true" /><span>Which tools make it work?</span><ChevronDown size={17} aria-hidden="true" /></summary><div className="clearnest-tools">
      <dl>{[
        ['Vapi', 'Gives Alex a voice and handles the conversation.'],
        ['n8n', 'Moves the request between the connected tools.'],
        ['Google Calendar', 'Checks free times and holds booked callbacks.'],
        ['Google Sheets', 'Keeps bookings and messages in one call log.'],
        ['Gmail', 'Sends the owner the details for follow-up.'],
      ].map(([tool, purpose]) => <div key={tool}><dt>{tool}</dt><dd>{purpose}</dd></div>)}</dl>
    </div></details>
    <details className="clearnest-extra"><summary><Phone size={20} aria-hidden="true" /><span>What does this demo cover?</span><ChevronDown size={17} aria-hidden="true" /></summary><div><p>Owner phone callbacks and messages for a fictional cleaning business, tested through browser calls. The owner agrees cleaning dates and prices. A client launch still needs real-phone tests, a check that unauthorized requests are refused, and protection against two callers booking the same time.</p></div></details>
    </div>
    <p className="clearnest-fine-print">Demo project for a fictional cleaning business, using sample customer details.</p>
  </div>;
}

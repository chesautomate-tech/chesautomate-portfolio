import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, CheckCircle2, ChevronDown, Clock3, Database, GitBranch, Layers3, MessageSquare, ShieldCheck, Workflow } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import intake from '@/assets/workflows/northline-receive.png';
import processor from '@/assets/workflows/northline-process.png';
import retry from '@/assets/workflows/northline-review-retry.png';
import amendments from '@/assets/workflows/northline-review-amendments.png';
import './northline.css';

const flows = [
  { title: 'Receive deal changes', label: 'Capture the request before confirming receipt', role: '01 / Intake', image: intake,
    description: 'A Pipedrive webhook sends the deal change. The workflow checks the incoming request, stores accepted work in Postgres, and only then confirms receipt.',
    benefit: 'The handoff has a saved place in the queue. A busy period can be worked through without relying on someone to remember which bookings still need attention.' },
  { title: 'Process handoff jobs', label: 'Build one complete, connected event', role: '02 / Main workflow', image: processor,
    description: 'Checks the current deal, dates, timezone and approved venue. Creates or reuses the client and contact, then creates the linked Airtable event. Existing events follow the review and approval paths.',
    benefit: 'Operations gets the booking and its related records together. Repeat requests reuse the same event, cutting down on retyping, duplicate cleanup and confusion over which record to use.' },
  { title: 'Review and retry bookings', label: 'Give staff a clear way to fix a held booking', role: '03 / Review subworkflow', image: retry,
    description: 'Slack explains what needs attention. Staff correct the source details in Pipedrive, then use Retry booking to request another check.',
    benefit: 'One incomplete booking can wait while other bookings continue. Staff know what to fix, and the retry still has to pass the checks before an event is created.' },
  { title: 'Review booking amendments', label: 'Put people in control of booking changes', role: '04 / Approval subworkflow', image: amendments,
    description: 'Shows the current and proposed details in Slack. Records an approval or rejection, then sends approved work back for fresh checks before updating Airtable.',
    benefit: 'Sales can revise a booking without silently changing the event plan. Only the current request can authorize an update, while operations notes and staff assignments are preserved.' },
];

const scenarios = [
  { id: 'requested', label: 'A change is requested', proposed: '66', accepted: '65', status: 'Waiting for staff approval', tone: 'waiting',
    headline: 'A sales edit does not immediately change the event.',
    description: 'The booking has 65 attendees. Sales requests 66. Staff see both numbers in Slack and decide whether to approve or reject the change.',
    result: 'Airtable stays at 65 while the team reviews the request.' },
  { id: 'replaced', label: 'Sales changes it again', proposed: '67', accepted: '65', status: 'Earlier request replaced', tone: 'waiting',
    headline: 'An old approval cannot apply an outdated change.',
    description: 'Before staff respond to 66, sales changes the count to 67. The system replaces the earlier request. Clicking its old approval button cannot queue an update.',
    result: 'Staff must review the latest request for 67. Airtable stays at 65.' },
  { id: 'withdrawn', label: 'Sales restores the original', proposed: '65', accepted: '65', status: 'Change withdrawn', tone: 'complete',
    headline: 'When the change disappears, the review closes.',
    description: 'Sales restores the original count of 65. After checking that the booking matches Airtable, the system closes the review and explains the withdrawal in Slack.',
    result: 'No Airtable update is needed. The original booking stays intact.' },
  { id: 'approved', label: 'Staff approve a change', proposed: '66', accepted: '66', status: 'Update checked and completed', tone: 'complete',
    headline: 'Approval starts a final check before the update.',
    description: 'Staff approve the current request for 66. The workflow rereads the booking, checks that the approval still applies, updates the same event, and reads it back to confirm.',
    result: 'Attendance becomes 66. Staff assignments and planning notes stay intact.' },
];

const checks = [
  ['A new customer books', 'Created the client, contact and event with the correct links.'],
  ['The same request arrives again', 'Reused the original records without creating another event.'],
  ['Missing details are corrected', 'The reviewed retry checked the corrected details and created the event.'],
  ['One booking needs attention', 'A second booking completed while the first remained on hold.'],
  ['Staff approve an attendance change', 'Updated 65 to 66, then restored 65 on the same event after a new approval.'],
  ['Someone clicks an old approval', 'Refused the outdated request; no update was queued.'],
  ['Sales withdraws a change', 'Closed the review when the checked details matched the accepted booking.'],
  ['Operations has already added notes', 'Preserved staff assignments, notes and other operations fields during the tested updates.'],
];
const stack = [
  ['Pipedrive', 'Sales records the booking'], ['n8n', 'Runs the checks and handoffs'],
  ['Airtable', 'Holds the event plan'], ['Slack', 'Brings decisions to staff'],
  ['Postgres / Supabase', 'Tracks work and decisions'],
];

function SavingsExample() {
  const [bookings, setBookings] = useState('40');
  const [minutes, setMinutes] = useState('10');
  const valid = bookings !== '' && minutes !== '' && Number.isInteger(Number(bookings)) && Number(bookings) >= 0 && Number(bookings) <= 10000
    && Number.isFinite(Number(minutes)) && Number(minutes) >= 0 && Number(minutes) <= 120;
  const total = valid ? Math.round(Number(bookings) * Number(minutes)) : 0;
  const hours = Math.floor(total / 60);
  const remainder = total % 60;
  return (
    <section className="northline-section northline-value" aria-labelledby="northline-value-title">
      <div><span className="detail-label">What could this be worth?</span><h3 id="northline-value-title">Give the team time back.<br />Start with your numbers.</h3>
        <p>Less copying. Less duplicate cleanup. Fewer messages chasing the latest details. Estimate the admin time you could remove from each booking.</p>
        <p className="northline-fine-print">Illustration only; actual savings have not been measured. Compare the value of time freed with setup, hosting and support costs.</p></div>
      <div className="northline-calculator">
        <div className="northline-calculator-inputs">
          <label htmlFor="northline-bookings">Bookings per month<input id="northline-bookings" type="number" min="0" max="10000" step="1" value={bookings} onChange={event => setBookings(event.target.value)} /></label><span aria-hidden="true">×</span>
          <label htmlFor="northline-minutes">Minutes saved per booking<input id="northline-minutes" type="number" min="0" max="120" step="any" value={minutes} onChange={event => setMinutes(event.target.value)} /></label>
        </div>
        <output className="northline-time-result" htmlFor="northline-bookings northline-minutes" aria-live="polite" aria-atomic="true"><strong>{valid ? <>{hours}<small>h</small> {remainder}<small>m</small></> : '—'}</strong><span>{valid ? 'potential time freed each month' : 'Enter valid, non-negative numbers above.'}</span></output>
      </div>
    </section>
  );
}

export default function NorthlineCaseStudy({ onDiscuss }: { onDiscuss: () => void }) {
  return (
    <div className="project-dialog-body northline-case">
      <section className="northline-intro" aria-labelledby="northline-outcome">
        <div className="northline-intro-copy"><span className="detail-label">Sales → operations</span><h3 id="northline-outcome">The sale is won.<br /><em>The handoff is handled.</em></h3>
          <p>I built four connected workflows that turn won Pipedrive deals into linked Airtable events. The system checks the details, catches repeat requests, and brings staff into Slack when a decision is needed.</p>
          <div className="northline-intro-meta"><span><Workflow size={15} /> Built with n8n</span><span><ShieldCheck size={15} /> Tested with sample bookings</span></div>
        </div>
        <figure className="northline-handoff" aria-label="Pipedrive sends a won booking to n8n for checking, then Airtable receives the linked event. Missing details and booking changes go to staff in Slack.">
          <figcaption>The handoff at a glance</figcaption>
          <div className="northline-handoff-step"><span className="northline-app-letter">P</span><div><small>Pipedrive · Sales</small><strong>Deal marked as won</strong></div><span className="northline-status">Won</span></div>
          <div className="northline-connector" aria-hidden="true" />
          <div className="northline-handoff-step northline-handoff-check"><span className="northline-app-letter"><Workflow size={22} /></span><div><small>n8n · Automation</small><strong>Check, match and prepare</strong></div><Check size={18} /></div>
          <div className="northline-connector" aria-hidden="true" />
          <div className="northline-handoff-step"><span className="northline-app-letter"><Layers3 size={21} /></span><div><small>Airtable · Operations</small><strong>One linked event to plan</strong></div><CheckCircle2 size={18} /></div>
          <div className="northline-human-step"><MessageSquare size={17} /><span><strong>Needs attention?</strong> Slack brings the issue or proposed change to staff.</span></div>
        </figure>
      </section>
      <section className="northline-section northline-business" aria-labelledby="northline-business-title">
        <div className="northline-section-heading"><span className="detail-label">The business case</span><h3 id="northline-business-title">A won deal shouldn’t become another admin job.</h3></div>
        <p>When sales and event planners use separate tools, someone has to copy the booking, link the right records and chase every change. This build takes care of that handoff and keeps staff in charge of decisions.</p>
        <div className="northline-benefits">
          <article><Clock3 size={20} /><h4>Start planning sooner</h4><p>Booking details arrive with the client, contact and venue linked. Staff can review the event instead of rebuilding it by hand.</p></article>
          <article><Layers3 size={20} /><h4>Keep one clear booking record</h4><p>Repeat requests reuse the existing event. The team avoids competing copies and the cleanup that comes with them.</p></article>
          <article><ShieldCheck size={20} /><h4>Stay in control as plans change</h4><p>Staff see proposed changes before they reach Airtable. Earlier approvals cannot override a newer request.</p></article>
        </div>
      </section>
      <section className="northline-section northline-scenarios" aria-labelledby="northline-control">
        <span className="detail-label">The detail that makes the difference</span><h3 id="northline-control">Sales can change the request.<br />Your team controls the event plan.</h3>
        <p>Start with 65 attendees in Airtable. Choose a situation to see how the system responds.</p>
        <Tabs.Root defaultValue="requested" className="northline-demo">
          <div className="northline-demo-label"><span>Explore the booking example</span><small>Illustration · no live data</small></div>
          <Tabs.List className="northline-scenario-tabs" aria-label="Booking change examples">{scenarios.map(scenario => <Tabs.Trigger value={scenario.id} key={scenario.id}>{scenario.label}</Tabs.Trigger>)}</Tabs.List>
          {scenarios.map(scenario => <Tabs.Content className="northline-scenario-panel" value={scenario.id} key={scenario.id}>
            <div className="northline-scenario-copy"><span className={`northline-scenario-status ${scenario.tone}`}><span />{scenario.status}</span><h4>{scenario.headline}</h4><p>{scenario.description}</p></div>
            <div className="northline-booking-comparison"><div><small>Sales request</small><strong>{scenario.proposed}<span>attendees</span></strong><span>Pipedrive</span></div><ShieldCheck size={23} aria-label="Staff approval and validation control the update" /><div><small>Event plan</small><strong>{scenario.accepted}<span>attendees</span></strong><span>Airtable</span></div></div>
            <p className="northline-scenario-result"><ShieldCheck size={17} /><span>{scenario.result}</span></p>
          </Tabs.Content>)}
        </Tabs.Root>
      </section>
      <section className="northline-section" aria-labelledby="northline-workflows">
        <div className="northline-section-heading northline-heading-row"><div><span className="detail-label">Inside the build</span><h3 id="northline-workflows">Four workflows. One complete handoff.</h3></div><GitBranch size={25} aria-hidden="true" /></div>
        <p>I designed the booking checks, database tracking and Slack review paths as connected workflows. Open any part to see its purpose and the actual n8n diagram.</p>
        <div className="northline-flow-list">{flows.map(flow => <details className="northline-flow" key={flow.title}>
          <summary><span><small>{flow.role}</small><strong>{flow.label}</strong></span><ChevronDown size={19} aria-hidden="true" /></summary>
          <div className="northline-flow-content"><div className="northline-flow-explanation"><div><span className="detail-label">What happens</span><p>{flow.description}</p></div><div><span className="detail-label">Why it matters</span><p>{flow.benefit}</p></div></div>
            <a className="full-canvas" href={flow.image} target="_blank" rel="noopener noreferrer" aria-label={`Open ${flow.title} diagram at full resolution in a new tab`}><img src={flow.image} alt={`${flow.title} — complete n8n workflow diagram`} loading="lazy" /><span>{flow.title}<span>View full diagram <ArrowUpRight size={15} /></span></span></a>
          </div>
        </details>)}</div>
      </section>
      <section className="northline-section northline-evidence" aria-labelledby="northline-tested">
        <div><span className="detail-label">Evidence behind the design</span><h3 id="northline-tested">Tested beyond the first successful booking.</h3><p>Using fictional bookings, I checked creation, repeat requests, held bookings, approvals and withdrawn changes across the connected system.</p></div>
        <details className="northline-proof"><summary><span><CheckCircle2 size={20} /><strong>See 8 tested scenarios and their results</strong></span><ChevronDown size={19} /></summary>
          <dl>{checks.map(([title, text]) => <div key={title}><dt><Check size={15} />{title}</dt><dd>{text}</dd></div>)}</dl>
          <p className="northline-fine-print">These are demonstration results. Concurrent requests, notification failures, major outages, uncertain writes and backup recovery still need broader testing before client deployment.</p>
        </details>
      </section>
      <section className="northline-section" aria-labelledby="northline-tools">
        <span className="detail-label">The connected tools</span><h3 id="northline-tools">Each tool has a clear job.</h3>
        <dl className="northline-tools">{stack.map(([name, purpose]) => <div key={name}><dt>{name}</dt><dd>{purpose}</dd></div>)}</dl>
        <details className="northline-database"><summary><Database size={21} /><span><strong>Why Postgres is part of the system</strong><small>And what if your business doesn’t have it?</small></span><ChevronDown size={18} /></summary>
          <div><p>Postgres is the system’s work log. It remembers which requests are waiting, what has finished, and which booking change was approved. That record lets the workflows pick up the right work and refuse outdated approvals.</p><p>This project uses Supabase to host Postgres. A business without it would need database setup, access controls, backups and running costs included in the implementation. Staff would still work in Pipedrive, Airtable and Slack.</p></div>
        </details>
      </section>
      <SavingsExample />
      <section className="northline-cta" aria-label="Discuss a similar workflow"><div><span className="detail-label">A similar gap in your business?</span><h3>Let’s find the handoff worth automating.</h3><p>We can map where details get copied, where work stalls and which decisions your team should keep.</p></div><button type="button" onClick={onDiscuss}>Discuss your workflow <ArrowRight size={17} /></button></section>
      <details className="northline-scope"><summary>Project scope and boundaries <ChevronDown size={15} /></summary><p>A personal demonstration for a fictional event services company, using sample data and Chicago event times. Covers booking setup and approved changes. Payments, invoicing, staffing, cancellations and changes back to Pipedrive are outside this build. It is not a client production deployment.</p></details>
    </div>
  );
}

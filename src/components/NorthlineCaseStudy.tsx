import { useState } from 'react';
import { ArrowUpRight, Check, CheckCircle2, ChevronDown, Clock3, Database, GitBranch, Layers3, MessageSquare, ShieldCheck, Workflow } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import intake from '@/assets/workflows/northline-receive.png';
import processor from '@/assets/workflows/northline-process.png';
import retry from '@/assets/workflows/northline-review-retry.png';
import amendments from '@/assets/workflows/northline-review-amendments.png';
import './northline.css';

const flows = [
  {
    title: 'Save the booking request', role: '01 / Receive', image: intake,
    description: 'Pipedrive sends the booking details. The workflow checks and saves the request before confirming it was received.',
    benefit: 'There is a saved record of the work waiting to be done, even when several bookings arrive.',
  },
  {
    title: 'Prepare the event for the team', role: '02 / Create', image: processor,
    description: 'Checks the dates, time zone and venue, then creates or reuses the customer records and their Airtable event.',
    benefit: 'The event and customer details are connected. Repeat requests reuse the same event instead of creating another copy.',
  },
  {
    title: 'Help staff fix missing details', role: '03 / Review', image: retry,
    description: 'Slack tells staff what needs attention. They fix the details in Pipedrive and select Retry booking for another check.',
    benefit: 'One incomplete booking can wait while others continue. The corrected booking must pass the checks before an event is created.',
  },
  {
    title: 'Get approval before plans change', role: '04 / Update', image: amendments,
    description: 'Staff compare the current and proposed details in Slack. Approved changes are checked again before Airtable is updated.',
    benefit: 'Only the latest request can be approved. Staff assignments and planning notes stay in place.',
  },
];

const scenarios = [
  {
    id: 'requested', label: 'A change is requested', proposed: '66', accepted: '65', status: 'Waiting for staff approval', tone: 'waiting',
    headline: 'The event plan waits for approval.',
    description: 'Sales changes the attendee count from 65 to 66. Staff see both numbers in Slack before deciding.',
    result: 'The event plan stays at 65 while staff review the request.',
  },
  {
    id: 'replaced', label: 'Sales changes it again', proposed: '67', accepted: '65', status: 'Earlier request replaced', tone: 'waiting',
    headline: 'An old approval cannot change the plan.',
    description: 'Sales changes 66 to 67 before staff respond. The old approval button can no longer authorize a change.',
    result: 'Staff must review the latest request for 67. The event plan stays at 65.',
  },
  {
    id: 'withdrawn', label: 'Sales restores the original', proposed: '65', accepted: '65', status: 'Change withdrawn', tone: 'complete',
    headline: 'An unnecessary review closes.',
    description: 'Sales restores the original count of 65. The system checks that it matches the event plan and tells staff the change was withdrawn.',
    result: 'No update is needed. The original booking stays intact.',
  },
  {
    id: 'approved', label: 'Staff approve a change', proposed: '66', accepted: '66', status: 'Update checked and completed', tone: 'complete',
    headline: 'The approved change reaches the same event.',
    description: 'Staff approve 66 attendees. The workflow checks the latest details, updates the event and confirms the change was saved.',
    result: 'Attendance becomes 66. Staff assignments and planning notes stay intact.',
  },
];

const checks = [
  ['A new customer books', 'Created the client, contact and event with the correct links.'],
  ['The same request arrives again', 'Reused the original records without creating another event.'],
  ['Missing details are corrected', 'Checked the corrected details and created the event after staff requested a retry.'],
  ['One booking needs attention', 'A second booking completed while the first remained on hold.'],
  ['Staff approve an attendance change', 'Updated 65 to 66, then restored 65 on the same event after a new approval.'],
  ['Someone clicks an old approval', 'Refused the outdated request without scheduling a booking update.'],
  ['Sales withdraws a change', 'Closed the review when the checked details matched the accepted booking.'],
  ['Staff have already added notes', 'Kept staff assignments, notes and other planning fields during the tested updates.'],
];

const stack = [
  ['Pipedrive', 'Sales records the booking.'], ['n8n', 'Checks and moves the details.'],
  ['Airtable', 'Keeps the event plan.'], ['Slack', 'Asks staff to review or approve.'],
  ['Postgres / Supabase', 'Remembers work and decisions.'],
];

function SavingsExample() {
  const [bookings, setBookings] = useState('40');
  const [minutes, setMinutes] = useState('10');
  const valid = bookings !== '' && minutes !== '' && Number.isInteger(Number(bookings)) && Number(bookings) >= 0 && Number(bookings) <= 10000
    && Number.isFinite(Number(minutes)) && Number(minutes) >= 0 && Number(minutes) <= 120;
  const total = valid ? Math.round(Number(bookings) * Number(minutes)) : 0;
  const hours = Math.floor(total / 60);
  const remainder = total % 60;
  return <div className="northline-value">
    <div>
      <h3>Try your own numbers.</h3>
      <p>Multiply your monthly bookings by the time you think you could save on each one.</p>
      <p className="northline-fine-print">Hypothetical estimate only. Actual savings have not been measured. Setup, hosting and support costs are not included.</p>
    </div>
    <div className="northline-calculator">
      <div className="northline-calculator-inputs">
        <label htmlFor="northline-bookings">Bookings per month<input id="northline-bookings" type="number" min="0" max="10000" step="1" value={bookings} onChange={event => setBookings(event.target.value)} /></label>
        <span aria-hidden="true">×</span>
        <label htmlFor="northline-minutes">Minutes you expect to save per booking<input id="northline-minutes" type="number" min="0" max="120" step="any" value={minutes} onChange={event => setMinutes(event.target.value)} /></label>
      </div>
      <output className="northline-time-result" htmlFor="northline-bookings northline-minutes" aria-live="polite" aria-atomic="true">
        <strong>{valid ? <>{hours}<small>h</small> {remainder}<small>m</small></> : '—'}</strong>
        <span>{valid ? 'estimated time freed each month' : 'Enter valid, non-negative numbers above.'}</span>
      </output>
    </div>
  </div>;
}

export default function NorthlineCaseStudy() {
  return <div className="project-dialog-body northline-case">
    <section className="northline-intro" aria-labelledby="northline-outcome">
      <div className="northline-intro-copy">
        <span className="detail-label">From confirmed sale to event plan</span>
        <h2 id="northline-outcome">The booking is won.<br /><em>Your team is ready to plan.</em></h2>
        <p>A confirmed sale becomes an event with the customer details in place. Staff spend less effort copying information and stay in control when plans change.</p>
        <div className="northline-intro-meta"><span><ShieldCheck size={15} aria-hidden="true" /> Tested with sample bookings</span></div>
      </div>
      <figure className="northline-handoff" aria-label="A confirmed Pipedrive booking is checked by n8n and saved in Airtable. Staff review issues and changes in Slack.">
        <figcaption>The booking at a glance</figcaption>
        <div className="northline-handoff-step"><span className="northline-app-letter" aria-hidden="true">P</span><div><small>Pipedrive · Sales</small><strong>Booking confirmed</strong></div><span className="northline-status">Won</span></div>
        <div className="northline-connector" aria-hidden="true" />
        <div className="northline-handoff-step northline-handoff-check"><span className="northline-app-letter"><Workflow size={22} aria-hidden="true" /></span><div><small>n8n · Automation</small><strong>Details checked</strong></div><Check size={18} aria-hidden="true" /></div>
        <div className="northline-connector" aria-hidden="true" />
        <div className="northline-handoff-step"><span className="northline-app-letter"><Layers3 size={21} aria-hidden="true" /></span><div><small>Airtable · Event team</small><strong>Event ready to plan</strong></div><CheckCircle2 size={18} aria-hidden="true" /></div>
        <div className="northline-human-step"><MessageSquare size={17} aria-hidden="true" /><span><strong>Missing details or a change?</strong> Staff review it in Slack.</span></div>
      </figure>
    </section>

    <section className="northline-section northline-business" aria-labelledby="northline-business-title">
      <span className="detail-label">What the business gets</span>
      <h2 id="northline-business-title">Less copying. Clearer bookings.</h2>
      <div className="northline-benefits">
        <article><Clock3 size={20} aria-hidden="true" /><h3>Start planning sooner</h3><p>Customer, contact and venue details arrive together, ready for the event team.</p></article>
        <article><Layers3 size={20} aria-hidden="true" /><h3>Avoid duplicate bookings</h3><p>Repeated requests use the same event, keeping the team on one record.</p></article>
        <article><ShieldCheck size={20} aria-hidden="true" /><h3>Keep control of changes</h3><p>Staff approve changes before the event is updated. Their planning notes stay intact.</p></article>
      </div>
      <p className="northline-fine-print">These outcomes were checked with sample bookings. Client time savings have not been measured.</p>
    </section>

    <section className="northline-section northline-details" aria-labelledby="northline-details-title">
      <h2 id="northline-details-title">Take a closer look</h2>
      <p>Open any detail that interests you.</p>
      <div className="northline-more">
        <details className="northline-extra">
          <summary><MessageSquare size={20} aria-hidden="true" /><span>Try a booking change example</span><ChevronDown size={18} aria-hidden="true" /></summary>
          <div className="northline-extra-content">
            <p>The event starts with 65 attendees. Choose a situation to see what happens next.</p>
            <Tabs.Root defaultValue="requested" className="northline-demo">
              <div className="northline-demo-label"><span>You choose the situation</span><small>Illustration · no live data</small></div>
              <Tabs.List className="northline-scenario-tabs" aria-label="Booking change examples">{scenarios.map(scenario => <Tabs.Trigger value={scenario.id} key={scenario.id}>{scenario.label}</Tabs.Trigger>)}</Tabs.List>
              {scenarios.map(scenario => <Tabs.Content className="northline-scenario-panel" value={scenario.id} key={scenario.id}>
                <div className="northline-scenario-copy"><span className={'northline-scenario-status ' + scenario.tone}><span />{scenario.status}</span><h3>{scenario.headline}</h3><p>{scenario.description}</p></div>
                <div className="northline-booking-comparison"><div><small>Sales request</small><strong>{scenario.proposed}<span>attendees</span></strong><span>Pipedrive</span></div><ShieldCheck size={23} aria-label="Staff approval and checks control the update" /><div><small>Event plan</small><strong>{scenario.accepted}<span>attendees</span></strong><span>Airtable</span></div></div>
                <p className="northline-scenario-result"><ShieldCheck size={17} aria-hidden="true" /><span>{scenario.result}</span></p>
              </Tabs.Content>)}
            </Tabs.Root>
          </div>
        </details>

        <details className="northline-extra">
          <summary><GitBranch size={20} aria-hidden="true" /><span>See the 4 connected workflows</span><ChevronDown size={18} aria-hidden="true" /></summary>
          <div className="northline-extra-content">
            <p>Each step includes a short explanation and its original workflow diagram.</p>
            <div className="northline-flow-list">{flows.map(flow => <details className="northline-flow" key={flow.title}>
              <summary><span><small>{flow.role}</small><strong>{flow.title}</strong></span><ChevronDown size={19} aria-hidden="true" /></summary>
              <div className="northline-flow-content">
                <div className="northline-flow-explanation"><div><span className="detail-label">What happens</span><p>{flow.description}</p></div><div><span className="detail-label">Why it helps</span><p>{flow.benefit}</p></div></div>
                <a className="full-canvas" href={flow.image} target="_blank" rel="noopener noreferrer" aria-label={'Open ' + flow.title + ' diagram at full resolution in a new tab'}><img src={flow.image} alt={flow.title + ' — complete n8n workflow diagram'} loading="lazy" /><span>{flow.title}<span>View full diagram <ArrowUpRight size={15} aria-hidden="true" /></span></span></a>
              </div>
            </details>)}</div>
          </div>
        </details>

        <details className="northline-extra">
          <summary><CheckCircle2 size={20} aria-hidden="true" /><span>What was checked?</span><ChevronDown size={18} aria-hidden="true" /></summary>
          <div className="northline-extra-content northline-proof">
            <p>Eight sample-booking checks covered new events, repeated requests, staff reviews and changes.</p>
            <dl>{checks.map(([title, text]) => <div key={title}><dt><Check size={15} aria-hidden="true" />{title}</dt><dd>{text}</dd></div>)}</dl>
            <p className="northline-fine-print">Before client use, more testing is needed for requests arriving at the same time, failed staff notifications, service outages, unclear save results and restoring backups.</p>
          </div>
        </details>

        <details className="northline-extra">
          <summary><Database size={20} aria-hidden="true" /><span>Which tools make it work?</span><ChevronDown size={18} aria-hidden="true" /></summary>
          <div className="northline-extra-content">
            <dl className="northline-tools">{stack.map(([name, purpose]) => <div key={name}><dt>{name}</dt><dd>{purpose}</dd></div>)}</dl>
            <div className="northline-database"><h3>Why a database?</h3><p>It acts as the work log: what is waiting, what is finished and which change was approved. This project uses Supabase to host a Postgres database.</p><p>A business without one would need setup, access controls, backups and running costs included. Staff would still use Pipedrive, Airtable and Slack.</p></div>
          </div>
        </details>

        <details className="northline-extra">
          <summary><Clock3 size={20} aria-hidden="true" /><span>Explore a possible time saving</span><ChevronDown size={18} aria-hidden="true" /></summary>
          <div className="northline-extra-content"><SavingsExample /></div>
        </details>

        <details className="northline-extra">
          <summary><ShieldCheck size={20} aria-hidden="true" /><span>What does this demo cover?</span><ChevronDown size={18} aria-hidden="true" /></summary>
          <div className="northline-extra-content"><p>A personal project for a fictional event company, using sample data and Chicago event times. It covers booking setup and approved changes. Payments, invoicing, staffing, cancellations and sending changes back to Pipedrive are outside this build. It has not been deployed for a client.</p></div>
        </details>
      </div>
    </section>
  </div>;
}

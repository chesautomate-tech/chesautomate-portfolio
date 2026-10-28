import { ArrowUpRight, ChevronDown, Mail, MessageSquare, Users } from 'lucide-react';
import type { Project } from '@/data/projects';
import './lead-reactivation.css';

const benefits = [
  { icon: Mail, title: 'Less follow-up to do by hand', text: 'Scheduled emails check in with past contacts, so the team spends less effort writing each first message.' },
  { icon: MessageSquare, title: 'See which replies need attention', text: 'AI helps sort interest, questions and declines, giving the team a clearer starting point for follow-up.' },
  { icon: Users, title: 'Keep people in the conversation', text: 'Customer records are updated as replies arrive. After 2 AI replies, the design hands the conversation to a person.' },
];

export default function LeadReactivationCaseStudy({ project }: { project: Project }) {
  return <div className="lead-case">
    <section className="lead-intro" aria-labelledby="lead-outcome">
      <span className="card-kicker">FOLLOW UP WITH PEOPLE WHO WENT QUIET</span>
      <h2 id="lead-outcome">Past inquiries.<br /><em>A chance to reconnect.</em></h2>
      <p>People ask about a service, then stop replying. This workflow checks in by email, helps handle the first replies and keeps the sales team’s contact records up to date.</p>
    </section>
    <section className="lead-benefits" aria-label="How this helps the business">
      {benefits.map(({ icon: Icon, title, text }) => <article key={title}><Icon size={22} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}
    </section>
    <p className="lead-note">Built with sample contacts. Sales results and time savings have not been measured.</p>

    <section className="lead-details" aria-labelledby="lead-details-title">
      <h2 id="lead-details-title">Want a closer look?</h2>
      <p>Open a section for the steps, tools or original workflow.</p>
      <details>
        <summary><span>01</span><h3>Send a check-in and handle the reply</h3><ChevronDown size={19} aria-hidden="true" /></summary>
        <div className="lead-detail-content">
          <p>The intended flow:</p>
          <ol className="lead-steps">
            <li>Find past contacts in HubSpot and check whether they should receive a follow-up.</li>
            <li>Use AI to draft a personal check-in, send it through Gmail and record that it was sent.</li>
            <li>Read incoming replies and sort them into interest, questions, declines or unclear responses.</li>
            <li>Send the next reply, update the contact’s record and hand over to a person after 2 AI replies.</li>
          </ol>
          <p><strong>Why it helps:</strong> The team has a repeatable way to revisit past inquiries and pick up conversations with the details already recorded.</p>
          <a className="lead-diagram" href={project.image} target="_blank" rel="noreferrer"><img src={project.image} alt="Lead follow-up workflow showing scheduled emails, incoming replies, contact updates and staff notifications" loading="lazy" /><span>Open the full workflow <ArrowUpRight size={17} aria-hidden="true" /></span></a>
        </div>
      </details>
      {project.errorImage && <details>
        <summary><span>02</span><h3>Tell the team when something fails</h3><ChevronDown size={19} aria-hidden="true" /></summary>
        <div className="lead-detail-content">
          <p>A separate workflow is designed to send a Slack alert if a run fails, giving the team a place to start checking the problem.</p>
          <p><strong>Why it helps:</strong> Staff can investigate interrupted follow-up instead of relying on someone to spot it manually. The alert flags a problem; it does not repair it.</p>
          <a className="lead-diagram" href={project.errorImage} target="_blank" rel="noreferrer"><img src={project.errorImage} alt="Error notification workflow sending an n8n failure alert to Slack" loading="lazy" /><span>Open the alert workflow <ArrowUpRight size={17} aria-hidden="true" /></span></a>
        </div>
      </details>}
      <details>
        <summary><h3>Which tools make it work?</h3><ChevronDown size={19} aria-hidden="true" /></summary>
        <div className="lead-detail-content"><dl className="lead-tools">{[
          ['HubSpot', 'Keeps contact details and the latest follow-up status.'],
          ['Cohere AI', 'Drafts emails and helps understand replies.'],
          ['Gmail', 'Sends check-ins and receives customer replies.'],
          ['Slack', 'Brings handoffs and error alerts to the team.'],
          ['n8n', 'Connects the steps and moves information between tools.'],
        ].map(([name, purpose]) => <div key={name}><dt>{name}</dt><dd>{purpose}</dd></div>)}</dl></div>
      </details>
      <details>
        <summary><h3>What does this demo show?</h3><ChevronDown size={19} aria-hidden="true" /></summary>
        <div className="lead-detail-content"><p>This personal project shows the design for email follow-up and reply handling. It uses sample contacts, not client data.</p><p>Before client use, check that stop requests prevent further emails, repeat runs do not send duplicates, the 2-reply handoff works, and failure alerts reach staff. The complete process has not been independently verified in a live system.</p></div>
      </details>
    </section>
  </div>;
}

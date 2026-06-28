export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="page-header d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

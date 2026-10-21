import { Seo } from './Seo';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';

type AdminPageProps = {
  loggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
};

/**
 * Dedicated /admin route — stays open on refresh because the URL itself
 * decides whether the panel is shown (not in-memory state).
 */
export function AdminPage({ loggedIn, onLogin, onLogout }: AdminPageProps) {
  return (
    <section className="admin-page" style={{ padding: '36px 0 64px', minHeight: '70vh' }}>
      <Seo
        title="Admin"
        description="Private admin panel for the portfolio."
        path="/admin"
        noindex
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
          marginBottom: 16,
        }}
      >
        <h1 className="t" style={{ margin: 0 }}>
          {loggedIn ? 'Admin Dashboard' : 'Admin Login'}
        </h1>
        <div className="btns" style={{ margin: 0 }}>
          <a className="btn magnetic" href="/">
            ← Back to site
          </a>
          {loggedIn && (
            <button type="button" className="btn magnetic" onClick={onLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
      {loggedIn ? <AdminDashboard /> : <AdminLogin onLogin={onLogin} />}
    </section>
  );
}

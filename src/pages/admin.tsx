import { useState, useEffect, useRef, ChangeEvent } from 'react';
import Head from 'next/head';
import { Save, Plus, Trash2, Eye, EyeOff, LogOut, Image as ImageIcon, X } from 'lucide-react';
import type { SiteContent, TestimonialContent, FAQItemContent } from '@/types/admin';
import { DEFAULT_CONTENT } from '@/utils/defaultContent';

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET || 'admin1234';

// ─── Shared UI ───────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-primary-500 transition-colors"
    />
  );
}

function Textarea({
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-primary-500 transition-colors resize-y"
    />
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
      <h2 className="font-bold text-white text-lg border-b border-zinc-800 pb-3">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_SECRET) {
      sessionStorage.setItem('admin_auth', '1');
      onLogin();
    } else {
      setError('Incorrect password.');
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-5"
      >
        <div>
          <h1 className="font-bold text-white text-2xl">Admin Panel</h1>
          <p className="text-zinc-500 text-sm mt-1">Enter the admin password to continue.</p>
        </div>
        <div className="relative">
          <input
            type={show ? 'text' : 'password'}
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            placeholder="Password"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm pr-10 focus:outline-none focus:border-primary-500"
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-2.5 rounded-lg transition-colors text-sm"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

// ─── Hero Editor ──────────────────────────────────────────────────────────────

function HeroEditor({
  data,
  onChange,
}: {
  data: SiteContent['hero'];
  onChange: (d: SiteContent['hero']) => void;
}) {
  function set<K extends keyof SiteContent['hero']>(key: K, val: SiteContent['hero'][K]) {
    onChange({ ...data, [key]: val });
  }
  return (
    <SectionCard title="Hero Section">
      <Field label="Headline line 1">
        <Input value={data.headline1} onChange={(v) => set('headline1', v)} placeholder="You've tried to stop." />
      </Field>
      <Field label="Headline line 2 (accent colour)">
        <Input value={data.headline2} onChange={(v) => set('headline2', v)} placeholder="It didn't stick." />
      </Field>
      <Field label="Headline line 3">
        <Input value={data.headline3} onChange={(v) => set('headline3', v)} placeholder="Here's why — and how to fix it." />
      </Field>
      <Field label="Subtext">
        <Textarea value={data.subtext} onChange={(v) => set('subtext', v)} rows={2} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Primary CTA text">
          <Input value={data.ctaPrimary} onChange={(v) => set('ctaPrimary', v)} />
        </Field>
        <Field label="Secondary CTA text">
          <Input value={data.ctaSecondary} onChange={(v) => set('ctaSecondary', v)} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Instagram handle">
          <Input value={data.instagramHandle} onChange={(v) => set('instagramHandle', v)} placeholder="@username" />
        </Field>
        <Field label="Instagram URL">
          <Input value={data.instagramUrl} onChange={(v) => set('instagramUrl', v)} type="url" placeholder="https://instagram.com/..." />
        </Field>
      </div>
    </SectionCard>
  );
}

// ─── Problem Statement Editor ─────────────────────────────────────────────────

function ProblemEditor({
  data,
  onChange,
}: {
  data: SiteContent['problem'];
  onChange: (d: SiteContent['problem']) => void;
}) {
  function setField<K extends keyof SiteContent['problem']>(key: K, val: SiteContent['problem'][K]) {
    onChange({ ...data, [key]: val });
  }
  function setPoint(index: number, key: 'heading' | 'body', val: string) {
    const updated = data.points.map((p, i) => (i === index ? { ...p, [key]: val } : p));
    onChange({ ...data, points: updated });
  }
  function addPoint() {
    onChange({ ...data, points: [...data.points, { heading: '', body: '' }] });
  }
  function removePoint(index: number) {
    onChange({ ...data, points: data.points.filter((_, i) => i !== index) });
  }

  return (
    <SectionCard title="Why Most People Fail Section">
      <Field label="Section heading">
        <Input value={data.heading} onChange={(v) => setField('heading', v)} />
      </Field>
      <Field label="Section subheading">
        <Input value={data.subheading} onChange={(v) => setField('subheading', v)} />
      </Field>
      <Field label="CTA button text">
        <Input value={data.ctaText} onChange={(v) => setField('ctaText', v)} />
      </Field>
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Points</span>
          <button
            onClick={addPoint}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-400 hover:text-primary-300"
          >
            <Plus size={13} /> Add point
          </button>
        </div>
        {data.points.map((p, i) => (
          <div key={i} className="bg-zinc-800/60 rounded-xl p-4 space-y-2 relative">
            <button
              onClick={() => removePoint(i)}
              className="absolute top-3 right-3 text-zinc-600 hover:text-red-400 transition-colors"
              aria-label="Remove point"
            >
              <Trash2 size={14} />
            </button>
            <div>
              <Label>Heading</Label>
              <Input value={p.heading} onChange={(v) => setPoint(i, 'heading', v)} />
            </div>
            <div>
              <Label>Body</Label>
              <Textarea value={p.body} onChange={(v) => setPoint(i, 'body', v)} rows={2} />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Books Editor ─────────────────────────────────────────────────────────────

function BooksEditor({
  data,
  onChange,
}: {
  data: SiteContent['books'];
  onChange: (d: SiteContent['books']) => void;
}) {
  function setField<K extends keyof SiteContent['books']>(key: K, val: SiteContent['books'][K]) {
    onChange({ ...data, [key]: val });
  }
  function setBook<K extends keyof SiteContent['books']['books'][0]>(
    index: number, key: K, val: SiteContent['books']['books'][0][K]
  ) {
    const updated = data.books.map((b, i) => (i === index ? { ...b, [key]: val } : b));
    onChange({ ...data, books: updated });
  }
  function addBook() {
    const newId = Math.max(0, ...data.books.map((b) => b.id)) + 1;
    onChange({
      ...data,
      books: [...data.books, { id: newId, title: '', subtitle: '', tagline: '', gumroadUrl: '', badge: 'Free' }],
    });
  }
  function removeBook(index: number) {
    onChange({ ...data, books: data.books.filter((_, i) => i !== index) });
  }

  return (
    <SectionCard title="Books Section">
      <Field label="Section heading">
        <Input value={data.heading} onChange={(v) => setField('heading', v)} />
      </Field>
      <Field label="Section subheading">
        <Input value={data.subheading} onChange={(v) => setField('subheading', v)} />
      </Field>
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Books</span>
          <button
            onClick={addBook}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-400 hover:text-primary-300"
          >
            <Plus size={13} /> Add book
          </button>
        </div>
        {data.books.map((book, i) => (
          <div key={book.id} className="bg-zinc-800/60 rounded-xl p-4 space-y-3 relative">
            <button
              onClick={() => removeBook(i)}
              className="absolute top-3 right-3 text-zinc-600 hover:text-red-400 transition-colors"
              aria-label="Remove book"
            >
              <Trash2 size={14} />
            </button>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Title</Label>
                <Input value={book.title} onChange={(v) => setBook(i, 'title', v)} />
              </div>
              <div>
                <Label>Badge text</Label>
                <Input value={book.badge} onChange={(v) => setBook(i, 'badge', v)} placeholder="Free" />
              </div>
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input value={book.subtitle} onChange={(v) => setBook(i, 'subtitle', v)} />
            </div>
            <div>
              <Label>Tagline / description</Label>
              <Textarea value={book.tagline} onChange={(v) => setBook(i, 'tagline', v)} rows={2} />
            </div>
            <div>
              <Label>Gumroad / purchase link</Label>
              <Input value={book.gumroadUrl} onChange={(v) => setBook(i, 'gumroadUrl', v)} type="url" placeholder="https://..." />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Testimonials Editor ──────────────────────────────────────────────────────

function TestimonialsEditor({
  data,
  onChange,
}: {
  data: SiteContent['testimonials'];
  onChange: (d: SiteContent['testimonials']) => void;
}) {
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);

  function setField<K extends keyof SiteContent['testimonials']>(
    key: K, val: SiteContent['testimonials'][K]
  ) {
    onChange({ ...data, [key]: val });
  }

  function setItem<K extends keyof TestimonialContent>(index: number, key: K, val: TestimonialContent[K]) {
    const updated = data.items.map((t, i) => (i === index ? { ...t, [key]: val } : t));
    onChange({ ...data, items: updated });
  }

  function addItem() {
    const newId = Math.max(0, ...data.items.map((t) => t.id)) + 1;
    onChange({
      ...data,
      items: [...data.items, { id: newId, name: '', quote: '', result: '' }],
    });
  }

  function removeItem(index: number) {
    onChange({ ...data, items: data.items.filter((_, i) => i !== index) });
  }

  function handleImageUpload(index: number, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setItem(index, 'screenshot', reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function removeScreenshot(index: number) {
    setItem(index, 'screenshot', undefined);
  }

  return (
    <SectionCard title="Reader Testimonials Section">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Label (small text above heading)">
          <Input value={data.label} onChange={(v) => setField('label', v)} />
        </Field>
        <Field label="Section heading">
          <Input value={data.heading} onChange={(v) => setField('heading', v)} />
        </Field>
      </div>
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Testimonials</span>
          <button onClick={addItem} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-400 hover:text-primary-300">
            <Plus size={13} /> Add testimonial
          </button>
        </div>
        {data.items.map((t, i) => (
          <div key={t.id} className="bg-zinc-800/60 rounded-xl p-4 space-y-3 relative">
            <button onClick={() => removeItem(i)} className="absolute top-3 right-3 text-zinc-600 hover:text-red-400 transition-colors" aria-label="Remove">
              <Trash2 size={14} />
            </button>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Name</Label>
                <Input value={t.name} onChange={(v) => setItem(i, 'name', v)} placeholder="Marcus T." />
              </div>
              <div>
                <Label>Result / badge</Label>
                <Input value={t.result} onChange={(v) => setItem(i, 'result', v)} placeholder="90-day streak" />
              </div>
            </div>
            <div>
              <Label>Quote</Label>
              <Textarea value={t.quote} onChange={(v) => setItem(i, 'quote', v)} rows={3} />
            </div>
            {/* Screenshot upload */}
            <div>
              <Label>Screenshot (optional)</Label>
              {t.screenshot ? (
                <div className="relative inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.screenshot} alt="Screenshot preview" className="h-28 rounded-lg border border-zinc-700 object-cover" />
                  <button
                    onClick={() => removeScreenshot(i)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center"
                    aria-label="Remove screenshot"
                  >
                    <X size={11} className="text-white" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileRefs.current[i]?.click()}
                  className="flex items-center gap-2 px-3 py-2 border border-dashed border-zinc-600 hover:border-primary-500 rounded-lg text-zinc-500 hover:text-zinc-300 text-xs transition-colors"
                >
                  <ImageIcon size={14} /> Upload screenshot
                </button>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={(el) => { fileRefs.current[i] = el; }}
                onChange={(e) => handleImageUpload(i, e)}
              />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── FAQ Editor ───────────────────────────────────────────────────────────────

function FAQEditor({
  data,
  onChange,
}: {
  data: SiteContent['faq'];
  onChange: (d: SiteContent['faq']) => void;
}) {
  function setField<K extends keyof SiteContent['faq']>(key: K, val: SiteContent['faq'][K]) {
    onChange({ ...data, [key]: val });
  }
  function setItem<K extends keyof FAQItemContent>(index: number, key: K, val: FAQItemContent[K]) {
    const updated = data.items.map((item, i) => (i === index ? { ...item, [key]: val } : item));
    onChange({ ...data, items: updated });
  }
  function addItem() {
    const newId = `faq-${Date.now()}`;
    onChange({ ...data, items: [...data.items, { id: newId, question: '', answer: '' }] });
  }
  function removeItem(index: number) {
    onChange({ ...data, items: data.items.filter((_, i) => i !== index) });
  }

  return (
    <SectionCard title="FAQ Section">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Label">
          <Input value={data.label} onChange={(v) => setField('label', v)} />
        </Field>
        <Field label="Heading">
          <Input value={data.heading} onChange={(v) => setField('heading', v)} />
        </Field>
      </div>
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Questions</span>
          <button onClick={addItem} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-400 hover:text-primary-300">
            <Plus size={13} /> Add question
          </button>
        </div>
        {data.items.map((item, i) => (
          <div key={item.id} className="bg-zinc-800/60 rounded-xl p-4 space-y-2 relative">
            <button onClick={() => removeItem(i)} className="absolute top-3 right-3 text-zinc-600 hover:text-red-400 transition-colors" aria-label="Remove">
              <Trash2 size={14} />
            </button>
            <div>
              <Label>Question</Label>
              <Input value={item.question} onChange={(v) => setItem(i, 'question', v)} />
            </div>
            <div>
              <Label>Answer</Label>
              <Textarea value={item.answer} onChange={(v) => setItem(i, 'answer', v)} rows={3} />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'problem' | 'books' | 'testimonials' | 'faq'>('hero');

  // Check session on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('admin_auth');
    if (stored === '1') setAuthed(true);
    setLoading(false);
  }, []);

  // Fetch content once authed
  useEffect(() => {
    if (!authed) return;
    fetch('/api/admin/content', { headers: { 'x-admin-secret': ADMIN_SECRET } })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: SiteContent | null) => {
        if (data) setContent(data);
      })
      .catch(() => {});
  }, [authed]);

  function showToast(type: 'success' | 'error', msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': ADMIN_SECRET },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        showToast('success', 'Changes saved successfully.');
      } else {
        showToast('error', 'Failed to save. Try again.');
      }
    } catch {
      showToast('error', 'Network error. Try again.');
    }
    setSaving(false);
  }

  function handleLogout() {
    sessionStorage.removeItem('admin_auth');
    setAuthed(false);
  }

  if (loading) return null;
  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const tabs = [
    { key: 'hero', label: 'Hero' },
    { key: 'problem', label: 'Why Fail' },
    { key: 'books', label: 'Books' },
    { key: 'testimonials', label: 'Testimonials' },
    { key: 'faq', label: 'FAQ' },
  ] as const;

  return (
    <>
      <Head>
        <title>Admin — Addiction to Freedom</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-zinc-950 text-white">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur border-b border-zinc-800 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <span className="font-bold text-white">Site Admin</span>
              <span className="text-zinc-600 text-xs">Addiction to Freedom</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                View site ↗
              </a>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 disabled:opacity-60 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors"
              >
                <Save size={15} />
                {saving ? 'Saving…' : 'Save changes'}
              </button>
              <button onClick={handleLogout} className="text-zinc-600 hover:text-zinc-300 transition-colors" aria-label="Log out">
                <LogOut size={16} />
              </button>
            </div>
          </div>

          {/* Tab bar */}
          <div className="max-w-5xl mx-auto flex gap-1 pb-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-primary-500 text-primary-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {activeTab === 'hero' && (
            <HeroEditor data={content.hero} onChange={(hero) => setContent({ ...content, hero })} />
          )}
          {activeTab === 'problem' && (
            <ProblemEditor data={content.problem} onChange={(problem) => setContent({ ...content, problem })} />
          )}
          {activeTab === 'books' && (
            <BooksEditor data={content.books} onChange={(books) => setContent({ ...content, books })} />
          )}
          {activeTab === 'testimonials' && (
            <TestimonialsEditor
              data={content.testimonials}
              onChange={(testimonials) => setContent({ ...content, testimonials })}
            />
          )}
          {activeTab === 'faq' && (
            <FAQEditor data={content.faq} onChange={(faq) => setContent({ ...content, faq })} />
          )}

          <div className="flex justify-end pb-8">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 disabled:opacity-60 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors"
            >
              <Save size={15} />
              {saving ? 'Saving…' : 'Save all changes'}
            </button>
          </div>
        </main>

        {/* Toast */}
        {toast && (
          <div
            className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl font-semibold text-sm shadow-xl ${
              toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}
          >
            {toast.msg}
          </div>
        )}
      </div>
    </>
  );
}

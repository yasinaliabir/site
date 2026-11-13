import { ArrowLeft, Check, Copy } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { paymentDetails } from '../data/payment';
import { PageIntro, Reveal } from '../components/Shared';

function CopyValueButton({ value, fieldId, copiedField, onCopy }: { value: string; fieldId: string; copiedField: string | null; onCopy: (fieldId: string, value: string) => void }) {
  const isCopied = copiedField === fieldId;
  return (
    <button className={`copy-value-button ${isCopied ? 'is-copied' : ''}`} type="button" onClick={() => onCopy(fieldId, value)} aria-label={`Copy ${value}`}>
      {isCopied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      <span>{isCopied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}

export default function PaymentPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const copyValue = useCallback(async (fieldId: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = value;
      textArea.setAttribute('readonly', '');
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
    setCopiedField(fieldId);
    window.setTimeout(() => setCopiedField((current) => (current === fieldId ? null : current)), 1800);
  }, []);

  return (
    <main className="page inner-page payment-page">
      <PageIntro title="Payment Details" text="Choose a payment method and copy the details you need." />
      <div className="payment-layout">
        <Reveal className="payment-card payment-bank-card soft-card">
          <div className="payment-card-heading">
            <img className="payment-logo" src={paymentDetails.bankLogo} alt="BRAC Bank" width={46} height={46} decoding="async" />
            <div><span>Bank transfer</span><h2>BRAC Bank PLC</h2></div>
          </div>
          <div className="payment-detail-list">
            {paymentDetails.bank.map((detail) => (
              <div className="payment-detail-row" key={detail.id}>
                <div className="payment-detail-copy"><span>{detail.label}</span><strong>{detail.value}</strong></div>
                <CopyValueButton value={detail.value} fieldId={detail.id} copiedField={copiedField} onCopy={copyValue} />
              </div>
            ))}
          </div>
        </Reveal>
        <div className="wallet-card-grid">
          {paymentDetails.wallets.map((detail, index) => (
            <Reveal className={`payment-card wallet-card wallet-${detail.id} soft-card`} key={detail.id} delay={index * 0.05}>
              <div className="wallet-card-top">
                <img className="payment-logo" src={detail.logo} alt={`${detail.label} logo`} width={40} height={40} decoding="async" />
                <span>{detail.label}{detail.note ? ` — ${detail.note}` : ''}</span>
              </div>
              <strong>{detail.value}</strong>
              <CopyValueButton value={detail.value} fieldId={detail.id} copiedField={copiedField} onCopy={copyValue} />
            </Reveal>
          ))}
        </div>
      </div>
      <div className="page-back-link"><Link to="/contact"><ArrowLeft size={15} />Back to contact</Link></div>
    </main>
  );
}

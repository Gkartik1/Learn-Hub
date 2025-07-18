// src/pages/Payment.jsx

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaLock } from "react-icons/fa";
import confetti from 'canvas-confetti';
import "../styles/Payment.css";

// --- EXPANDED DATA STRUCTURE ---
const plans = [
  { id: 'free', name: "Basic", price: { monthly: 0, annually: 0 }, features: ["Access to free materials", "Community support", "1 learning roadmap"], popular: false },
  { id: 'pro', name: "Premium", price: { monthly: 499, annually: 4799 }, features: ["All Basic features", "Exclusive premium content", "Priority mentorship", "Ad-free experience", "Project reviews"], popular: true },
  { id: 'teams', name: "Teams", price: { monthly: 3999, annually: 39999 }, features: ["All Premium features", "Team dashboard", "Bulk licensing", "Dedicated support"], popular: false },
];

const validCoupons = { LEARNHUB20: 20, SUMMER15: 15 };

// --- MAIN PAYMENT COMPONENT ---
const Payment = () => {
  const [step, setStep] = useState(1); // 1: Plans, 2: Checkout, 3: Success
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [currency, setCurrency] = useState({ code: 'INR', symbol: '₹' });
  const [selectedPlanId, setSelectedPlanId] = useState('pro');
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedPlan = plans.find(p => p.id === selectedPlanId);
  const exchangeRate = 83.0; // Dummy exchange rate

  const finalPrice = useMemo(() => {
    const basePrice = selectedPlan.price[billingCycle];
    const priceInCurrency = currency.code === 'USD' ? basePrice / exchangeRate : basePrice;
    return priceInCurrency * ((100 - discount) / 100);
  }, [selectedPlan, billingCycle, currency, discount, exchangeRate]);

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (validCoupons[code]) {
      setDiscount(validCoupons[code]);
      setErrorMsg("");
    } else {
      setDiscount(0);
      setErrorMsg("Invalid coupon code.");
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2500);
  };
  
  // Confetti effect on success
  useEffect(() => {
    if (step === 3) {
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    }
  }, [step]);
  
  return (
    <div className="payment-page">
      <div className="payment-aurora" />
      <div className="payment-container">
        <Stepper currentStep={step} />
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" {...animationProps}>
              <PlanSelection
                plans={plans} selectedPlanId={selectedPlanId} setSelectedPlanId={setSelectedPlanId}
                billingCycle={billingCycle} setBillingCycle={setBillingCycle}
                currency={currency} setCurrency={setCurrency}
              />
              <button className="cta-button" onClick={() => selectedPlan.id === 'free' ? alert("You're all set with the Free plan!") : setStep(2)}>
                {selectedPlan.id === 'free' ? 'Get Started' : 'Proceed to Checkout'}
              </button>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="step2" {...animationProps}>
              <Checkout
                plan={selectedPlan} finalPrice={finalPrice} currency={currency} discount={discount}
                coupon={coupon} setCoupon={setCoupon} applyCoupon={applyCoupon} errorMsg={errorMsg}
                handlePayment={handlePayment} isProcessing={isProcessing} setStep={setStep}
              />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="step3" {...animationProps}>
              <PaymentSuccess plan={selectedPlan} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- HELPER & UI COMPONENTS ---

const animationProps = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.4, ease: "easeInOut" }
};

const Stepper = ({ currentStep }) => (
  <div className="stepper">
    {['Choose Plan', 'Checkout', 'Confirmation'].map((label, index) => (
      <React.Fragment key={label}>
        <div className={`step ${currentStep >= index + 1 ? 'active' : ''}`}>
          <div className="step-number">{currentStep > index + 1 ? '✔' : index + 1}</div>
          <div className="step-label">{label}</div>
        </div>
        {index < 2 && <div className="step-connector" />}
      </React.Fragment>
    ))}
  </div>
);

const PlanSelection = ({ plans, selectedPlanId, setSelectedPlanId, billingCycle, setBillingCycle, currency, setCurrency }) => (
  <>
    <div className="controls-bar">
        <div className="billing-toggle">
            <span>Monthly</span>
            <label className="switch"><input type="checkbox" onChange={() => setBillingCycle(p => p === 'monthly' ? 'annually' : 'monthly')} /><span className="slider round"></span></label>
            <span>Annually <span className="save-badge">Save 20%</span></span>
        </div>
        <div className="currency-switcher">
            <button className={currency.code === 'INR' ? 'active' : ''} onClick={() => setCurrency({code: 'INR', symbol: '₹'})}>INR</button>
            <button className={currency.code === 'USD' ? 'active' : ''} onClick={() => setCurrency({code: 'USD', symbol: '$'})}>USD</button>
        </div>
    </div>
    <div className="plans-grid">
      {plans.map(plan => (
        <motion.div key={plan.id} className={`plan-card ${plan.popular ? 'popular' : ''} ${selectedPlanId === plan.id ? 'selected' : ''}`} onClick={() => setSelectedPlanId(plan.id)} whileHover={{y: -5}}>
            {plan.popular && <div className="popular-badge">Most Popular</div>}
            <h3>{plan.name}</h3>
            <div className="plan-price">
              {plan.price.monthly === 0 ? 'Free' : `${currency.symbol}${ (currency.code === 'USD' ? plan.price[billingCycle] / 83 : plan.price[billingCycle]).toFixed(0)}`}
              <span>/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
            </div>
            <ul>{plan.features.map((feat, i) => (<li key={i}><FaCheckCircle /> {feat}</li>))}</ul>
        </motion.div>
      ))}
    </div>
  </>
);

const Checkout = ({ plan, finalPrice, currency, discount, coupon, setCoupon, applyCoupon, errorMsg, handlePayment, isProcessing, setStep }) => (
  <div className="checkout-container">
    <div className="order-summary">
      <h4>Order Summary</h4>
      <div className="summary-item"><span>{plan.name} Plan</span><span>{currency.symbol}{plan.price.monthly === 0 ? '0.00' : (currency.code === 'USD' ? plan.price.monthly/83 : plan.price.monthly).toFixed(2)}</span></div>
      {discount > 0 && <div className="summary-item discount"><span>Coupon "{coupon.toUpperCase()}"</span><span>-{currency.symbol}{((currency.code === 'USD' ? plan.price.monthly/83 : plan.price.monthly) * (discount/100)).toFixed(2)}</span></div>}
      <div className="summary-total"><span>Total</span><span>{currency.symbol}{finalPrice.toFixed(2)}</span></div>
      <div className="coupon-form">
          <input type="text" placeholder="Coupon Code" value={coupon} onChange={e => setCoupon(e.target.value)} />
          <button onClick={applyCoupon}>Apply</button>
      </div>
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      <div className="trust-badges">
          <span><FaLock /> SSL Secured Payment</span>
          <span>7-Day Money-Back Guarantee</span>
      </div>
    </div>
    <form className="payment-form" onSubmit={handlePayment}>
      <h4>Payment Details</h4>
      <input type="text" placeholder="Card Number" />
      <input type="text" placeholder="Cardholder Name" />
      <div className="form-row">
        <input type="text" placeholder="MM / YY" />
        <input type="text" placeholder="CVC" />
      </div>
      <button type="submit" className="cta-button pay-now-btn" disabled={isProcessing}>
        {isProcessing ? <div className="loader"/> : `Pay ${currency.symbol}${finalPrice.toFixed(2)}`}
      </button>
      <button type="button" className="cancel-btn" onClick={() => setStep(1)}>Go Back</button>
    </form>
  </div>
);

const PaymentSuccess = ({plan}) => (
    <div className="success-container">
        <motion.div className="success-icon" initial={{scale: 0}} animate={{scale: 1}} transition={{delay: 0.2, type: 'spring', stiffness: 200}}>
            <FaCheckCircle />
        </motion.div>
        <h2>Payment Successful!</h2>
        <p>Welcome to LearnHub {plan.name}! Your access has been upgraded and you're all set to explore the new features.</p>
        <a href="/dashboard" className="cta-button">Go to Dashboard</a>
    </div>
);

export default Payment;
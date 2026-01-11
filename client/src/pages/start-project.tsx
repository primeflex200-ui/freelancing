import { Navbar } from "@/components/ui/navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, Check, Monitor, Gamepad2, Rocket, Code, X } from "lucide-react";
import { useLocation } from "wouter";
import { useDesignSelection } from "@/contexts/DesignSelectionContext";

const websiteTypes = [
  { id: "professional", name: "Professional", icon: Monitor, description: "Corporate & Business" },
  { id: "gaming", name: "Gaming", icon: Gamepad2, description: "Gaming & Esports" },
  { id: "startups", name: "Startups", icon: Rocket, description: "MVP & SaaS" },
  { id: "api-backend", name: "API & Backend", icon: Code, description: "Backend Services" }
];

const domainOptions = [
  { 
    id: "own", 
    label: "Own Domain", 
    value: "own",
    description: "Use your existing domain or purchase one separately",
    price: "₹0"
  },
  { 
    id: "stackweb", 
    label: "StackWeb Domain", 
    value: "stackweb",
    description: "Get a professional domain from StackWeb",
    price: "₹400"
  }
];

export default function StartProject() {
  const [, setLocation] = useLocation();
  const { selectedDesign, clearSelection } = useDesignSelection();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    websiteType: "",
    projectName: "",
    projectDescription: "",
    communicationMethods: [] as string[],
    budget: "",
    domain: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
    company: ""
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          websiteType: formData.websiteType,
          projectName: formData.projectName,
          projectDescription: formData.projectDescription,
          communicationMethods: formData.communicationMethods.join(", "),
          budget: formData.budget,
          domain: formData.domain,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          selectedDesignId: selectedDesign?.designId || null,
          selectedDesignTitle: selectedDesign?.designTitle || null,
          selectedDesignCategory: selectedDesign?.designCategory || null,
          selectedDesignImageUrl: selectedDesign?.designImageUrl || null,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        console.log("Project submitted successfully:", data.project);
        clearSelection(); // Clear selection after successful submission
        setLocation("/project-submitted");
      } else {
        console.error("Failed to submit project:", data.error);
        alert("Failed to submit project. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.websiteType !== "";
      case 2:
        return formData.projectName && formData.projectDescription && formData.communicationMethods.length > 0;
      case 3:
        return formData.budget && parseFloat(formData.budget) >= 499;
      case 4:
        return formData.domain !== "";
      case 5:
        return formData.name && formData.email;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Selected Design Display */}
          {selectedDesign && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 glass p-4 rounded-2xl"
            >
              <div className="flex items-center gap-4">
                <img
                  src={selectedDesign.designImageUrl}
                  alt={selectedDesign.designTitle}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Selected Design</p>
                      <h3 className="font-bold text-black text-lg">{selectedDesign.designTitle}</h3>
                      <span className="inline-block mt-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full capitalize">
                        {selectedDesign.designCategory.replace('-', ' ')}
                      </span>
                    </div>
                    <button
                      onClick={clearSelection}
                      className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                      title="Clear selection"
                    >
                      <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {[...Array(totalSteps)].map((_, i) => (
                <div key={i} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      i + 1 <= step
                        ? 'bg-primary text-white'
                        : 'bg-black/5 text-muted-foreground'
                    }`}
                  >
                    {i + 1 < step ? <Check className="w-5 h-5" /> : i + 1}
                  </div>
                  {i < totalSteps - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 transition-colors ${
                        i + 1 < step ? 'bg-primary' : 'bg-black/5'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Step {step} of {totalSteps}
            </p>
          </div>

          {/* Form Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass p-8 rounded-2xl"
            >
              {/* Step 1: Website Type */}
              {step === 1 && (
                <div>
                  <h2 className="text-3xl font-bold text-black mb-4">Select Website Type</h2>
                  <p className="text-muted-foreground mb-8">Choose the type that best fits your project</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {websiteTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setFormData({ ...formData, websiteType: type.id })}
                        className={`p-6 rounded-xl border-2 transition-all text-left ${
                          formData.websiteType === type.id
                            ? 'border-primary bg-primary/5'
                            : 'border-black/10 hover:border-black/20'
                        }`}
                      >
                        <type.icon className="w-8 h-8 mb-3 text-primary" />
                        <h3 className="font-bold text-black mb-1">{type.name}</h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Project Details */}
              {step === 2 && (
                <div>
                  <h2 className="text-3xl font-bold text-black mb-4">Project Details</h2>
                  <p className="text-muted-foreground mb-8">Tell us about your project</p>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Project Name *
                      </label>
                      <Input
                        value={formData.projectName}
                        onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                        placeholder="My Awesome Project"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Project Description *
                      </label>
                      <Textarea
                        value={formData.projectDescription}
                        onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                        placeholder="Describe your project goals, features, and requirements..."
                        rows={6}
                        className="w-full"
                      />
                    </div>

                    {/* Communication Methods */}
                    <div>
                      <label className="block text-sm font-medium text-black mb-3">
                        How would you like to receive project updates? *
                      </label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          { id: "admin", label: "Admin Panel" },
                          { id: "gmail", label: "Gmail" },
                          { id: "whatsapp", label: "WhatsApp" },
                          { id: "message", label: "SMS Message" }
                        ].map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => {
                              const methods = formData.communicationMethods.includes(method.id)
                                ? formData.communicationMethods.filter(m => m !== method.id)
                                : [...formData.communicationMethods, method.id];
                              setFormData({ ...formData, communicationMethods: methods });
                            }}
                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                              formData.communicationMethods.includes(method.id)
                                ? 'border-primary bg-primary/5'
                                : 'border-black/10 hover:border-black/20'
                            }`}
                          >
                            <span className="font-semibold text-black">{method.label}</span>
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        You can select multiple options
                      </p>

                      {/* Warning for WhatsApp and SMS */}
                      {(formData.communicationMethods.includes("whatsapp") || 
                        formData.communicationMethods.includes("message")) && (
                        <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold text-amber-900 mb-1">Additional Budget Required</h4>
                              <p className="text-sm text-amber-800 leading-relaxed">
                                {formData.communicationMethods.includes("whatsapp") && 
                                 formData.communicationMethods.includes("message") 
                                  ? "If you want a business number for WhatsApp and SMS messaging instead of using your own number, additional budget will be required for setup and monthly fees."
                                  : formData.communicationMethods.includes("whatsapp")
                                  ? "If you want a business WhatsApp number instead of using your own number, additional budget will be required for setup and monthly fees."
                                  : "If you want a business number for SMS messaging instead of using your own number, additional budget will be required for setup and monthly fees."
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Budget */}
              {step === 3 && (
                <div>
                  <h2 className="text-3xl font-bold text-black mb-4">Budget Affording</h2>
                  <p className="text-muted-foreground mb-8">Enter your budget (Minimum ₹499)</p>
                  
                  {/* Quality Notice */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-l-4 border-primary rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-black mb-1">Quality & Budget Relationship</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          The quality, features, and complexity of your website directly depend on your budget. 
                          Higher budgets enable advanced functionality, custom designs, premium integrations, 
                          and more development time for a polished final product.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Your Budget (₹) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                          ₹
                        </span>
                        <Input
                          type="number"
                          min="499"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          placeholder="499"
                          className="w-full pl-8 text-lg"
                        />
                      </div>
                      {formData.budget && parseFloat(formData.budget) < 499 && (
                        <p className="text-sm text-red-500 mt-2">
                          Minimum budget is ₹499
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground mt-2">
                        Starting from ₹499 only
                      </p>
                    </div>

                    {/* Budget Guide */}
                    <div className="mt-6 p-4 bg-black/5 rounded-lg">
                      <h4 className="font-semibold text-black mb-3 text-sm">Budget Guide:</h4>
                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <span className="font-semibold text-black min-w-[100px]">₹499 - ₹1,499:</span>
                          <span>Basic landing page with essential features</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-semibold text-black min-w-[100px]">₹1,599 - ₹2,499:</span>
                          <span>Professional multi-page website with custom design</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-semibold text-black min-w-[100px]">₹2,999 - ₹4,999:</span>
                          <span>Advanced website with CMS, animations & integrations</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-semibold text-black min-w-[100px]">₹5,000 - ₹7,500:</span>
                          <span>Enterprise solution with custom features & scalability</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Domain Selection */}
              {step === 4 && (
                <div>
                  <h2 className="text-3xl font-bold text-black mb-4">Domain Selection</h2>
                  <p className="text-muted-foreground mb-8">Choose your domain option</p>
                  <div className="space-y-4">
                    {domainOptions.map((domain) => (
                      <button
                        key={domain.id}
                        onClick={() => setFormData({ ...formData, domain: domain.value })}
                        className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                          formData.domain === domain.value
                            ? 'border-primary bg-primary/5'
                            : 'border-black/10 hover:border-black/20'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-black text-lg mb-1">{domain.label}</h3>
                            <p className="text-sm text-muted-foreground">{domain.description}</p>
                          </div>
                          <span className="text-lg font-bold text-primary">{domain.price}</span>
                        </div>
                        {domain.id === "stackweb" && (
                          <div className="mt-3 pt-3 border-t border-black/10">
                            <p className="text-xs text-muted-foreground">
                              ✓ Professional domain setup
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ✓ Free SSL certificate included
                            </p>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Contact Information */}
              {step === 5 && (
                <div>
                  <h2 className="text-3xl font-bold text-black mb-4">Contact Information</h2>
                  <p className="text-muted-foreground mb-8">How can we reach you?</p>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Full Name *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Company (Optional)
                      </label>
                      <Input
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Inc."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Review */}
              {step === 6 && (
                <div>
                  <h2 className="text-3xl font-bold text-black mb-4">Review & Submit</h2>
                  <p className="text-muted-foreground mb-8">Please review your information</p>
                  <div className="space-y-6">
                    <div className="p-4 bg-black/5 rounded-lg">
                      <h4 className="font-semibold text-black mb-2">Website Type</h4>
                      <p className="text-muted-foreground capitalize">{formData.websiteType.replace('-', ' ')}</p>
                    </div>
                    <div className="p-4 bg-black/5 rounded-lg">
                      <h4 className="font-semibold text-black mb-2">Project Details</h4>
                      <p className="text-muted-foreground font-semibold">{formData.projectName}</p>
                      <p className="text-muted-foreground text-sm mt-1">{formData.projectDescription}</p>
                    </div>
                    <div className="p-4 bg-black/5 rounded-lg">
                      <h4 className="font-semibold text-black mb-2">Communication Methods</h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.communicationMethods.map((method) => (
                          <span key={method} className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full capitalize">
                            {method === "admin" ? "Admin Panel" : method === "gmail" ? "Gmail" : method === "whatsapp" ? "WhatsApp" : "SMS Message"}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-black/5 rounded-lg">
                        <h4 className="font-semibold text-black mb-2">Budget</h4>
                        <p className="text-muted-foreground">₹{formData.budget}</p>
                      </div>
                      <div className="p-4 bg-black/5 rounded-lg">
                        <h4 className="font-semibold text-black mb-2">Domain</h4>
                        <p className="text-muted-foreground capitalize">
                          {formData.domain === "own" ? "Own Domain" : "StackWeb Domain (₹400)"}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 bg-black/5 rounded-lg">
                      <h4 className="font-semibold text-black mb-2">Contact</h4>
                      <p className="text-muted-foreground">{formData.name}</p>
                      <p className="text-muted-foreground text-sm">{formData.email}</p>
                      {formData.phone && <p className="text-muted-foreground text-sm">{formData.phone}</p>}
                      {formData.company && <p className="text-muted-foreground text-sm">{formData.company}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-8 border-t border-black/10">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  disabled={step === 1}
                  className="rounded-full"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                {step < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="bg-black text-white hover:bg-zinc-800 rounded-full"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-primary text-white hover:bg-primary/90 rounded-full"
                  >
                    Submit Project
                    <Check className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

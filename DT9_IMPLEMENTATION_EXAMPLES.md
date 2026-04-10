---
version: 1.0
created: 2026-04-10
status: Reference
title: DT9 Component Implementation Examples
---

# DT9 Implementation Examples — Code Reference

This guide provides practical before/after examples for migrating your existing React components to use Dialtone DT9 design system patterns.

---

## 1. Color Tokens Setup

### Before: Custom Colors

```javascript
// In tailwind.config within the HTML file
theme: {
  extend: {
    colors: {
      brand: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',    // Generic purple
        600: '#9333ea',
        700: '#7e22ce',
        // ...
      }
    }
  }
}
```

### After: DT9 Tokens

```javascript
// src/styles/tokens.js or tailwind.config.js
const DT9_TOKENS = {
  color: {
    primary: {
      50: '#f0f4ff',
      100: '#e0e8ff',
      500: '#4f46e5',   // Dialpad brand blue
      600: '#4338ca',
      700: '#3730a3',
    },
    success: {
      600: '#16a34a',
    },
    warning: {
      600: '#ea580c',
    },
    error: {
      600: '#dc2626',
    },
    neutral: {
      50:  '#f9fafb',
      100: '#f3f4f6',
      600: '#4b5563',
      900: '#111827',
    }
  },
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
  },
  borderRadius: {
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
  },
  typography: {
    heading: {
      h1: { fontSize: '32px', fontWeight: '700', lineHeight: '1.25' },
      h2: { fontSize: '24px', fontWeight: '700', lineHeight: '1.33' },
      h3: { fontSize: '18px', fontWeight: '600', lineHeight: '1.33' },
    },
    body: {
      lg: { fontSize: '16px', fontWeight: '400', lineHeight: '1.5' },
      md: { fontSize: '14px', fontWeight: '400', lineHeight: '1.57' },
      sm: { fontSize: '12px', fontWeight: '400', lineHeight: '1.67' },
    }
  }
}

module.exports = {
  theme: {
    colors: DT9_TOKENS.color,
    spacing: DT9_TOKENS.spacing,
    borderRadius: DT9_TOKENS.borderRadius,
    fontSize: {
      h1: '32px',
      h2: '24px',
      body: '16px',
      // ...
    }
  }
}
```

---

## 2. Button Component Migration

### Before: Custom Button Styles

```jsx
// Current approach - inline Tailwind classes
<button
  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-semibold transition-colors"
  onClick={handleSubmit}
>
  Submit
</button>

<button
  className="bg-white border-2 border-purple-600 text-purple-600 px-4 py-2 rounded-md font-semibold hover:bg-purple-50 transition-colors"
  onClick={handleSkip}
>
  Skip
</button>
```

### After: DT9 Button Component

```jsx
// Create a reusable DT9 Button component
// src/components/Button.jsx

export const Button = ({ 
  variant = 'primary',  // 'primary', 'secondary', 'tertiary', 'danger'
  size = 'md',          // 'sm', 'md', 'lg'
  disabled = false,
  isLoading = false,
  children,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-white border-2 border-primary-600 text-primary-600 hover:bg-neutral-50 focus:ring-primary-500',
    tertiary: 'bg-transparent text-primary-600 hover:bg-neutral-50 focus:ring-primary-500',
    danger: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}

// Usage - cleaner, consistent, maintainable
<Button variant="primary" size="md" onClick={handleSubmit}>
  Get Results
</Button>

<Button variant="secondary" size="md" onClick={handleSkip}>
  Skip Section
</Button>

<Button variant="danger" size="sm" disabled>
  Delete
</Button>
```

---

## 3. Form Controls

### Before: Default HTML Input

```jsx
<label className="block mb-2">
  <span className="font-medium text-gray-700">Assessment Approach</span>
  <input 
    type="radio"
    name="approach"
    value="technical"
    onChange={handleChange}
    className="mt-1"
  />
  Technical approach
</label>
```

### After: DT9 Form Component

```jsx
// src/components/FormInput.jsx
export const RadioGroup = ({ label, name, options, value, onChange }) => {
  return (
    <fieldset className="mb-lg">
      {label && (
        <legend className="block font-semibold text-neutral-900 mb-md">
          {label}
        </legend>
      )}
      <div className="space-y-md">
        {options.map(option => (
          <label key={option.value} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"  // Visually hide default input
            />
            <span className="flex items-center">
              {/* Custom radio indicator */}
              <span className={`
                w-5 h-5 border-2 rounded-full mr-sm transition-all
                ${value === option.value 
                  ? 'bg-primary-600 border-primary-600' 
                  : 'border-neutral-300 hover:border-primary-600'}
              `}>
                {value === option.value && (
                  <div className="w-full h-full rounded-full bg-white scale-75" />
                )}
              </span>
              <span className="text-neutral-700">
                {option.label}
              </span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

// Usage
<RadioGroup
  label="Assessment Approach"
  name="approach"
  options={[
    { value: 'technical', label: 'Technical approach' },
    { value: 'business', label: 'Business-focused approach' }
  ]}
  value={selectedApproach}
  onChange={setSelectedApproach}
/>
```

---

## 4. Progress Indicator

### Before: Simple Progress Bar

```jsx
<div className="mb-8">
  <div className="text-sm font-semibold mb-2">
    Progress: {completedSections} of {totalSections}
  </div>
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div 
      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
      style={{ width: `${(completedSections / totalSections) * 100}%` }}
    />
  </div>
</div>
```

### After: DT9 Progress + Step Indicator

```jsx
// src/components/ProgressIndicator.jsx
export const StepIndicator = ({ 
  currentStep, 
  totalSteps, 
  steps 
}) => {
  return (
    <div className="mb-xl">
      {/* Linear Progress */}
      <div className="mb-lg">
        <div className="flex justify-between items-center mb-md">
          <span className="text-sm font-semibold text-neutral-900">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-sm text-neutral-600">
            {Math.round(((currentStep + 1) / totalSteps) * 100)}% complete
          </span>
        </div>
        <div className="w-full bg-neutral-200 rounded-lg h-1 overflow-hidden">
          <div 
            className="bg-primary-600 h-1 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Pills (Optional - for larger screens) */}
      <div className="hidden md:flex gap-md justify-between">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`
              flex-1 p-md rounded-lg text-center text-sm font-medium transition-all
              ${idx <= currentStep 
                ? 'bg-primary-50 text-primary-700 border-2 border-primary-600' 
                : 'bg-neutral-100 text-neutral-600 border-2 border-neutral-200'}
            `}
          >
            <div className="text-xs text-neutral-500 mb-sm">Step {idx + 1}</div>
            <div>{step}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Usage
<StepIndicator 
  currentStep={2}
  totalSteps={6}
  steps={[
    'Infrastructure',
    'Communications',
    'Experience',
    'Analytics',
    'Security',
    'Review'
  ]}
/>
```

---

## 5. Card Component

### Before: Generic Div Container

```jsx
<div className="bg-white border border-gray-200 rounded-lg p-6 mb-4 shadow-sm">
  <h3 className="text-lg font-semibold mb-2">
    Your Maturity Score
  </h3>
  <div className="text-4xl font-bold text-purple-600 mb-2">
    65%
  </div>
  <p className="text-gray-600 text-sm">
    Your organization has achieved moderate maturity
  </p>
</div>
```

### After: DT9 Card Component

```jsx
// src/components/Card.jsx
export const Card = ({ 
  variant = 'default',  // 'default', 'success', 'warning', 'error', 'highlight'
  padding = 'lg',
  children 
}) => {
  const variants = {
    default: 'bg-white border-neutral-200 shadow-sm',
    success: 'bg-success-50 border-success-200',
    warning: 'bg-warning-50 border-warning-200',
    error: 'bg-error-50 border-error-200',
    highlight: 'bg-primary-50 border-primary-300 shadow-md'
  }
  
  const paddings = {
    sm: 'p-md',
    md: 'p-lg',
    lg: 'p-xl'
  }
  
  return (
    <div className={`
      border rounded-lg ${variants[variant]} ${paddings[padding]}
      transition-shadow hover:shadow-md
    `}>
      {children}
    </div>
  )
}

// Stat Card Sub-component
export const StatCard = ({ label, value, unit = '', variant = 'default' }) => {
  return (
    <Card variant={variant} padding="lg">
      <div className="text-sm text-neutral-600 font-medium mb-md">
        {label}
      </div>
      <div className="flex items-baseline gap-sm">
        <div className="text-4xl font-bold text-primary-600">
          {value}
        </div>
        {unit && (
          <div className="text-lg text-neutral-500">
            {unit}
          </div>
        )}
      </div>
    </Card>
  )
}

// Usage
<StatCard 
  label="Your Maturity Score"
  value="65"
  unit="%"
  variant="highlight"
/>

<Card variant="success">
  <h3 className="text-lg font-semibold text-success-900 mb-md">
    Strong Area: Cloud Infrastructure
  </h3>
  <p className="text-neutral-700">
    Your organization is leveraging modern cloud technology effectively.
  </p>
</Card>
```

---

## 6. Alert/Message Component

### Before: Basic Alert

```jsx
{error && (
  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4">
    Error: {error}
  </div>
)}
```

### After: DT9 Alert Component

```jsx
// src/components/Alert.jsx
export const Alert = ({ 
  type = 'info',  // 'info', 'success', 'warning', 'error'
  title,
  message,
  onDismiss,
  action
}) => {
  const styles = {
    info: {
      container: 'bg-blue-50 border-blue-200',
      icon: 'text-blue-600',
      title: 'text-blue-900',
      message: 'text-blue-800'
    },
    success: {
      container: 'bg-success-50 border-success-200',
      icon: 'text-success-600',
      title: 'text-success-900',
      message: 'text-success-800'
    },
    warning: {
      container: 'bg-warning-50 border-warning-200',
      icon: 'text-warning-600',
      title: 'text-warning-900',
      message: 'text-warning-800'
    },
    error: {
      container: 'bg-error-50 border-error-200',
      icon: 'text-error-600',
      title: 'text-error-900',
      message: 'text-error-800'
    }
  }
  
  const style = styles[type]
  
  return (
    <div className={`border rounded-lg p-md mb-lg ${style.container}`}>
      <div className="flex gap-md">
        {/* Icon */}
        <div className={`flex-shrink-0 text-lg ${style.icon}`}>
          {type === 'error' && '⚠'}
          {type === 'success' && '✓'}
          {type === 'warning' && '!'}
          {type === 'info' && 'ℹ'}
        </div>
        
        {/* Content */}
        <div className="flex-1">
          {title && (
            <h4 className={`font-semibold mb-sm ${style.title}`}>
              {title}
            </h4>
          )}
          <p className={style.message}>
            {message}
          </p>
          
          {/* Action Button */}
          {action && (
            <div className="mt-md">
              <Button 
                variant="tertiary" 
                size="sm"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            </div>
          )}
        </div>
        
        {/* Dismiss */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-neutral-400 hover:text-neutral-600"
            aria-label="Dismiss"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

// Usage
{error && (
  <Alert 
    type="error"
    title="Unable to Process Assessment"
    message={error}
    action={{
      label: 'Retry',
      onClick: handleRetry
    }}
    onDismiss={() => setError(null)}
  />
)}

{success && (
  <Alert 
    type="success"
    title="Assessment Complete!"
    message="Your results are ready. Download or share your report."
  />
)}
```

---

## 7. Full Section Card Component

### Before: Complex Inline Styles

```jsx
<div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
  <div className="flex items-start gap-4 mb-6">
    <div className="text-3xl">📊</div>
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {section.title}
      </h2>
      <p className="text-gray-600">
        {section.description}
      </p>
    </div>
  </div>
  
  <div className="space-y-4 mb-6">
    {section.questions.map(q => (
      <div key={q.id}>
        <label className="block font-medium text-gray-700 mb-2">
          {q.text}
        </label>
        <div className="space-y-2">
          {q.options.map(opt => (
            <label key={opt.label} className="flex items-center">
              <input 
                type="radio"
                name={q.id}
                value={opt.label}
                checked={responses[q.id] === opt.label}
                onChange={(e) => handleResponse(q.id, e.target.value)}
              />
              <span className="ml-2">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    ))}
  </div>
  
  <div className="flex gap-2 pt-4 border-t border-gray-200">
    <button 
      onClick={handleNext}
      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
    >
      Next Section
    </button>
    <button 
      onClick={handleSkip}
      className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
    >
      Skip
    </button>
  </div>
</div>
```

### After: DT9 Component with Composition

```jsx
// src/components/SectionCard.jsx
export const SectionCard = ({ 
  section, 
  responses,
  onResponse,
  onNext,
  onSkip,
  isLoading = false
}) => {
  return (
    <Card variant="default" padding="lg">
      {/* Header */}
      <div className="mb-xl">
        <div className="flex items-start gap-lg mb-md">
          <div className="text-3xl flex-shrink-0" aria-hidden="true">
            {section.icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-md">
              {section.title}
            </h2>
            <p className="text-neutral-600">
              {section.description}
            </p>
          </div>
        </div>
      </div>

      {/* Questions */}
      <form className="space-y-lg mb-xl">
        {section.questions.map(question => (
          <Question
            key={question.id}
            question={question}
            value={responses[question.id]}
            onChange={(value) => onResponse(question.id, value)}
          />
        ))}
      </form>

      {/* Actions */}
      <div className="flex gap-md pt-lg border-t border-neutral-200">
        <Button
          variant="primary"
          onClick={onNext}
          disabled={isLoading}
        >
          Next Section
        </Button>
        <Button
          variant="tertiary"
          onClick={onSkip}
          disabled={isLoading}
        >
          Skip
        </Button>
      </div>
    </Card>
  )
}

// Sub-component for individual questions
export const Question = ({ question, value, onChange }) => {
  return (
    <fieldset>
      <legend className="block font-semibold text-neutral-900 mb-md">
        {question.text}
      </legend>
      <RadioGroup
        name={question.id}
        options={question.options.map(opt => ({
          value: opt.label,
          label: opt.label
        }))}
        value={value}
        onChange={onChange}
      />
    </fieldset>
  )
}

// Usage - much cleaner!
<SectionCard
  section={currentSection}
  responses={responses}
  onResponse={handleResponse}
  onNext={handleNextSection}
  onSkip={handleSkipSection}
  isLoading={isProcessing}
/>
```

---

## 8. Tailwind Config with DT9 Tokens

### Updated tailwind.config.js

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e8ff',
          200: '#c7d9ff',
          300: '#a4c5ff',
          400: '#81a9ff',
          500: '#4f46e5',  // Dialpad brand
          600: '#4338ca',
          700: '#3730a3',
          800: '#2e2683',
          900: '#1e1b4b',
        },
        success: {
          50: '#f0fdf4',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fef3c7',
          600: '#ea580c',
          700: '#c2410c',
        },
        error: {
          50: '#fef2f2',
          600: '#dc2626',
          700: '#b91c1c',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          600: '#4b5563',
          700: '#374151',
          900: '#111827',
        }
      },
      spacing: {
        xs: '0.25rem',   // 4px
        sm: '0.5rem',    // 8px
        md: '1rem',      // 16px
        lg: '1.5rem',    // 24px
        xl: '2rem',      // 32px
        '2xl': '2.5rem', // 40px
      },
      borderRadius: {
        sm: '0.25rem',   // 4px
        md: '0.5rem',    // 8px
        lg: '0.75rem',   // 12px
      },
      fontSize: {
        h1: ['32px', { lineHeight: '1.25', fontWeight: '700' }],
        h2: ['24px', { lineHeight: '1.33', fontWeight: '700' }],
        h3: ['18px', { lineHeight: '1.33', fontWeight: '600' }],
        body: ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        sm: ['14px', { lineHeight: '1.57', fontWeight: '400' }],
        xs: ['12px', { lineHeight: '1.67', fontWeight: '400' }],
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      }
    }
  },
  plugins: [],
}
```

---

## 9. Migration Checklist

- [ ] Update Tailwind config with DT9 tokens
- [ ] Create Button component with variants
- [ ] Create Card component
- [ ] Create Alert component
- [ ] Create Form controls (RadioGroup, TextInput, etc.)
- [ ] Create ProgressIndicator component
- [ ] Refactor all inline styles → DT9 components
- [ ] Update copy/labels to match brand voice
- [ ] Add ARIA labels to form controls
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Verify color contrast WCAG AA
- [ ] Test responsive design (Mobile, Tablet, Desktop)

---

**Last Updated:** 2026-04-10  
**Version:** 1.0  
**Status:** Ready for Implementation  

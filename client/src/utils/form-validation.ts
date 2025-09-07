// Enhanced form validation utilities
export interface ValidationRule {
  field: string;
  validator: (value: string) => boolean;
  message: string;
}

export interface FormValidationOptions {
  showAlert?: boolean;
  showToast?: boolean;
  customErrorHandler?: (errors: ValidationError[]) => void;
}

export interface ValidationError {
  field: string;
  message: string;
}

export const commonValidators = {
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },
  
  password: (value: string) => value.length >= 8,
  
  required: (value: string) => value.trim().length > 0,
  
  minLength: (min: number) => (value: string) => value.length >= min,
  
  maxLength: (max: number) => (value: string) => value.length <= max,
  
  numeric: (value: string) => /^\d+$/.test(value),
  
  wallet: (value: string) => /^0x[a-fA-F0-9]{40}$/.test(value),
  
  strongPassword: (value: string) => {
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    return value.length >= 8 && hasUpper && hasLower && hasNumber && hasSpecial;
  }
};

export function validateForm(
  formElement: HTMLFormElement,
  rules: ValidationRule[],
  options: FormValidationOptions = {}
): ValidationError[] {
  const errors: ValidationError[] = [];
  
  rules.forEach(rule => {
    const element = formElement.querySelector(`[name="${rule.field}"], #${rule.field}`) as HTMLInputElement;
    if (element && !rule.validator(element.value)) {
      errors.push({ field: rule.field, message: rule.message });
      
      // Add visual error indicator
      element.classList.add('is-invalid');
      element.addEventListener('input', () => {
        if (rule.validator(element.value)) {
          element.classList.remove('is-invalid');
          element.classList.add('is-valid');
        }
      }, { once: true });
    }
  });
  
  // Handle errors based on options
  if (errors.length > 0) {
    if (options.customErrorHandler) {
      options.customErrorHandler(errors);
    } else if (options.showAlert !== false) {
      const errorMessages = errors.map(e => e.message).join('\n');
      alert(errorMessages);
    }
  }
  
  return errors;
}

export function setupFormValidation(
  selector: string = 'form',
  customRules?: ValidationRule[],
  options?: FormValidationOptions
) {
  document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll(selector);
    
    forms.forEach(form => {
      const formElement = form as HTMLFormElement;
      
      // Default validation rules
      const defaultRules: ValidationRule[] = [
        {
          field: 'email',
          validator: commonValidators.email,
          message: 'Please enter a valid email address.'
        },
        {
          field: 'password',
          validator: commonValidators.password,
          message: 'Password must be at least 8 characters long.'
        }
      ];
      
      const rules = customRules || defaultRules;
      
      formElement.addEventListener('submit', (e) => {
        const errors = validateForm(formElement, rules, options);
        if (errors.length > 0) {
          e.preventDefault();
        }
      });
    });
  });
}

// Enhanced page load animation
export function initPageAnimations() {
  // Initial fade-in animation
  document.body.style.opacity = '0';
  
  setTimeout(() => {
    document.body.style.transition = 'opacity 1s ease';
    document.body.style.opacity = '1';
  }, 100);
  
  // Staggered animations for elements
  const animateElements = () => {
    const elementsToAnimate = document.querySelectorAll('.animate-on-load');
    elementsToAnimate.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animate-fade-in');
      }, index * 100);
    });
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateElements);
  } else {
    animateElements();
  }
}

// Initialize default form validation and animations
setupFormValidation();
initPageAnimations();
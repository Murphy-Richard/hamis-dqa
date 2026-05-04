/**
 * HAPPY Program Questionnaire - Frontend Logic
 * Handles form validation, conditional sections, ID generation, and submission
 */

// ===== CONFIGURATION =====
const CONFIG = {
  API_ENDPOINT: 'https://script.google.com/macros/s/AKfycbzKG62FxQvouPswxEiWHob4YZnXY0vc7bZuGRPy2FZkS0SGoWPYbE51ntTiyn531zLdWQ/exec',
  PARTNER_PREFIXES: {
    'Jobberman': 'JOB',
    'Agrico': 'AGR',
    'YouthEmpower': 'YOU',
    'SkillsGH': 'SKI',
    'Other': 'OTH'
  },
  REGIONS: {
    "Greater Accra": ["Ablekuma Central", "Ablekuma North", "Ablekuma West", "Accra Metropolitan", "Ada East", "Ada West", "Adenta", "Ashaiman", "Ayawaso East", "Ayawaso North", "Ayawaso West", "Ga Central", "Ga East", "Ga North", "Ga South", "Ga West", "Korle Klottey", "Kpone Katamanso", "Krowor", "La Dade Kotopon", "La Nkwantanang Madina", "Ledzokuku", "Ningo Prampram", "Okaikwei North", "Shai Osudoku", "Tema Metropolitan", "Tema West", "Weija Gbawe"],
    "Ashanti": ["Adansi Asokwa", "Adansi North", "Adansi South", "Afigya Kwabre North", "Afigya Kwabre South", "Ahafo Ano North", "Ahafo Ano South East", "Ahafo Ano South West", "Amansie Central", "Amansie South", "Amansie West", "Asante Akim Central", "Asante Akim North", "Asante Akim South", "Asokore Mampong", "Atwima Kwanwoma", "Atwima Mponua", "Atwima Nwabiagya North", "Atwima Nwabiagya South", "Bekwai", "Bosome Freho", "Bosomtwe", "Ejisu", "Ejura Sekyedumase", "Juaben", "Kumasi Metropolitan", "Kwabre East", "Kwadaso", "Mampong", "Obuasi East", "Obuasi Municipal", "Offinso Municipal", "Offinso North", "Oforikrom", "Old Tafo", "Sekyere Afram Plains", "Sekyere Central", "Sekyere East", "Sekyere Kumawu", "Sekyere South", "Suame", "Asokwa", "Bantama"],
    "Eastern": ["Abuakwa North", "Abuakwa South", "Achiase", "Akwapim North", "Akwapim South", "Akyemansa", "Asene Manso Akroso", "Asuogyaman", "Atiwa East", "Atiwa West", "Ayensuano", "Birim North", "Birim South", "Birem Central", "Denkyembour", "Fanteakwa North", "Fanteakwa South", "Kwaebibirem", "Kwahu Afram Plains North", "Kwahu Afram Plains South", "Kwahu East", "Kwahu South", "Kwahu West", "Lower Manya Krobo", "New Juaben North", "New Juaben South", "Nsawam Adoagyiri", "Okere", "Suhum", "Upper Manya Krobo", "Upper West Akim", "Yilo Krobo"],
    "Volta": ["Adaklu", "Afadzato South", "Agotime-Ziope", "Akatsi North", "Akatsi South", "Anloga", "Central Tongu", "Ho Municipal", "Ho West", "Hohoe Municipal", "Keta Municipal", "Ketu North", "Ketu South", "Kpando Municipal", "North Dayi", "North Tongu", "South Dayi", "South Tongu"],
    "Northern": ["Gushegu", "Karaga", "Kpandai", "Kumbungu", "Mion", "Nanumba North", "Nanumba South", "Nanton", "Saboba", "Sagnarigu", "Savelugu", "Tamale Metropolitan", "Tatale Sanguli", "Tolon", "Yendi Municipal", "Zabzugu", "North Gonja", "Central Gonja"],
    "North East": ["Bunkpurugu-Nyankpanduri", "Chereponi", "East Mamprusi", "Mamprugu Moagduri", "West Mamprusi", "Yunyoo-Nasuan"],
    "Upper West": ["Daffiama-Bussie-Issa", "Jirapa", "Lambussie", "Lawra", "Nadowli-Kaleo", "Nandom", "Sissala East", "Sissala West", "Wa East", "Wa Municipal", "Wa West"],
    "Upper East": ["Bawku Municipal", "Bawku West", "Binduri", "Bolgatanga East", "Bolgatanga Municipal", "Bongo", "Builsa North", "Builsa South", "Garu", "Kassena-Nankana East", "Kassena-Nankana West", "Nabdam", "Pusiga", "Talensi", "Tempane"],
    "Oti": ["Biakoye", "Guan", "Jasikan", "Kadjebi", "Krachi East", "Krachi Nchumuru", "Krachi West", "Nkwanta North", "Nkwanta South"],
    "Bono": ["Banda", "Berekum East", "Berekum West", "Dormaa Central", "Dormaa East", "Dormaa West", "Jaman North", "Jaman South", "Sunyani", "Sunyani West", "Tain", "Wenchi"],
    "Bono East": ["Atebubu-Amantin", "Kintampo North", "Kintampo South", "Nkoranza North", "Nkoranza South", "Pru East", "Pru West", "Sene East", "Sene West", "Techiman Municipal", "Techiman North"],
    "Ahafo": ["Asunafo North", "Asunafo South", "Asutifi North", "Asutifi South", "Tano North", "Tano South"],
    "Savannah": ["Bole", "Central Gonja", "East Gonja", "North East Gonja", "North Gonja", "Sawla-Tuna-Kalba", "West Gonja"],
    "Western": ["Ahanta West", "Effia-Kwesimintsim", "Ellembelle", "Jomoro", "Mpohor", "Nzema East", "Prestea-Huni Valley", "Sekondi-Takoradi Metropolitan", "Shama", "Tarkwa-Nsuaem", "Wassa Amenfi Central", "Wassa Amenfi East", "Wassa Amenfi West", "Wassa East"],
    "Western North": ["Aowin", "Bia East", "Bia West", "Bibiani-Anhwiaso-Bekwai", "Bodi", "Juaboso", "Sefwi Akontombra", "Sefwi Wiawso Municipal", "Suaman"],
    "Central": ["Abura-Asebu-Kwamankese", "Agona East", "Agona West", "Ajumako-Enyan-Essiam", "Asikuma-Odoben-Brakwa", "Assin Central", "Assin North", "Assin South", "Awutu Senya", "Awutu Senya East", "Cape Coast Metropolitan", "Effutu", "Ekumfi", "Gomoa Central", "Gomoa East", "Gomoa West", "Komenda-Edina-Eguafo-Abrem", "Mfantsiman", "Twifo-Atti Morkwa", "Twifo Hemang Lower Denkyira", "Upper Denkyira East", "Upper Denkyira West"]
  },
  SECTOR_DATA: {
    "Agriculture": {
      "Rice": ["Farm Manager", "Agronomist", "Farm Laborer", "Irrigation Specialist", "Rice Milling Operator"],
      "Poultry": ["Poultry Farm Manager", "Veterinarian", "Farm Hand", "Feed Specialist", "Egg Collector"],
      "Tomato": ["Farm Manager", "Horticulture Specialist", "Farm Laborer", "Harvest Coordinator"],
      "Soybean": ["Farm Manager", "Agronomist", "Farm Laborer", "Processing Technician"],
      "Maize": ["Farm Manager", "Agronomist", "Farm Laborer", "Storage Manager"],
      "Cassava": ["Farm Manager", "Processing Specialist", "Farm Laborer"]
    },
    "Non-Agriculture": {
      "Tourism": ["Hotel Manager", "Tour Guide", "Receptionist", "Housekeeping", "Travel Agent"],
      "ICT": ["IT Manager", "Software Developer", "IT Helpdesk Technician", "Network Engineer", "Data Entry Clerk"],
      "Construction": ["Project Manager", "Civil Engineer", "Mason", "Electrician", "Plumber", "Carpenter"],
      "Retail": ["Store Manager", "Sales Associate", "Cashier", "Stock Clerk", "Customer Service Rep"],
      "Manufacturing": ["Production Manager", "Machine Operator", "Quality Inspector", "Warehouse Staff"],
      "Health": ["Nurse", "Community Health Worker", "Pharmacy Assistant", "Lab Technician"],
      "Education": ["Teacher", "Teaching Assistant", "School Administrator", "Tutor"]
    }
  }
};

// ===== STATE =====
let formState = {
  collectorName: '',
  deviceId: '',
  regionCounter: {},
  globalSequence: 0,
  isSubmitting: false
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initializeForm();
  setupEventListeners();
  updatePartnerDisplays();
});

function initializeForm() {
  // Set today's date as default for onboarding date
  document.getElementById('onboardingDate').valueAsDate = new Date();
  
  // Generate device ID
  formState.deviceId = generateDeviceId();
  document.getElementById('deviceId').value = formState.deviceId;
  
  // Populate regions
  populateRegions();
  
  // Load collector name from localStorage if available
  const savedCollector = localStorage.getItem('happyCollector');
  if (savedCollector) {
    document.getElementById('collectorName').value = savedCollector;
    document.getElementById('collectorDisplay').textContent = savedCollector;
    formState.collectorName = savedCollector;
  }
  
  // Check online status
  updateOnlineStatus();
}

function setupEventListeners() {
  // Collector name change
  document.getElementById('collectorName').addEventListener('change', (e) => {
    formState.collectorName = e.target.value;
    localStorage.setItem('happyCollector', e.target.value);
    document.getElementById('collectorDisplay').textContent = e.target.value;
  });
  
  // Phone validation on blur
  document.getElementById('telephone').addEventListener('blur', validatePhone);
  
  // Ghana Card validation on blur
  document.getElementById('ghanaCardId').addEventListener('blur', validateGhanaCard);
  
  // Online/offline detection
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  // Prevent form submission on Enter key (except textarea)
  document.getElementById('questionnaireForm').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  });
}

// ===== REGION & DISTRICT LOGIC =====
function populateRegions() {
  const select = document.getElementById('region');
  const placementSelect = document.getElementById('placementRegion');
  
  Object.keys(CONFIG.REGIONS).sort().forEach(region => {
    const opt = document.createElement('option');
    opt.value = region;
    opt.textContent = region;
    select.appendChild(opt.cloneNode(true));
    placementSelect.appendChild(opt);
  });
}

function populateDistricts() {
  const region = document.getElementById('region').value;
  const select = document.getElementById('district');
  
  select.innerHTML = '<option value="">Select District</option>';
  
  if (region && CONFIG.REGIONS[region]) {
    CONFIG.REGIONS[region].sort().forEach(district => {
      const opt = document.createElement('option');
      opt.value = district;
      opt.textContent = district;
      select.appendChild(opt);
    });
    select.disabled = false;
  } else {
    select.disabled = true;
  }
}

function populatePlacementDistricts() {
  const region = document.getElementById('placementRegion').value;
  const select = document.getElementById('placementDistrict');
  
  select.innerHTML = '<option value="">Select District</option>';
  
  if (region && CONFIG.REGIONS[region]) {
    CONFIG.REGIONS[region].sort().forEach(district => {
      const opt = document.createElement('option');
      opt.value = district;
      opt.textContent = district;
      select.appendChild(opt);
    });
    select.disabled = false;
  } else {
    select.disabled = true;
  }
}

// ===== CASCADE LOGIC: Sector → Industry → Job Type → Job Role =====
function populateIndustries() {
  const sector = document.getElementById('sector').value;
  const industrySelect = document.getElementById('industry');
  const jobTypeSelect = document.getElementById('jobType');
  const jobRoleSelect = document.getElementById('jobRole');
  
  // Reset downstream selects
  industrySelect.innerHTML = '<option value="">Select</option>';
  jobTypeSelect.innerHTML = '<option value="">Select</option><option value="Management">Management</option><option value="Technical">Technical</option><option value="Administrative">Administrative</option><option value="Support">Support</option>';
  jobRoleSelect.innerHTML = '<option value="">Select</option>';
  jobTypeSelect.disabled = true;
  jobRoleSelect.disabled = true;
  
  if (sector && CONFIG.SECTOR_DATA[sector]) {
    Object.keys(CONFIG.SECTOR_DATA[sector]).sort().forEach(industry => {
      const opt = document.createElement('option');
      opt.value = industry;
      opt.textContent = industry;
      industrySelect.appendChild(opt);
    });
    industrySelect.disabled = false;
  } else {
    industrySelect.disabled = true;
  }
}

function populateJobTypes() {
  const jobTypeSelect = document.getElementById('jobType');
  jobTypeSelect.disabled = false;
}

function populateJobRoles() {
  const sector = document.getElementById('sector').value;
  const industry = document.getElementById('industry').value;
  const jobType = document.getElementById('jobType').value;
  const jobRoleSelect = document.getElementById('jobRole');
  
  jobRoleSelect.innerHTML = '<option value="">Select</option>';
  
  if (sector && industry && jobType && CONFIG.SECTOR_DATA[sector]?.[industry]) {
    CONFIG.SECTOR_DATA[sector][industry].forEach(role => {
      const opt = document.createElement('option');
      opt.value = role;
      opt.textContent = role;
      jobRoleSelect.appendChild(opt);
    });
    jobRoleSelect.disabled = false;
  } else {
    jobRoleSelect.disabled = true;
  }
}

// ===== CONDITIONAL FIELD TOGGLES =====
function toggleRefugeeField() {
  const status = document.getElementById('refugeeStatus').value;
  const field = document.getElementById('nationalityField');
  field.classList.toggle('hidden', status !== 'Yes');
}

function toggleDisabilityField() {
  const status = document.getElementById('disabilityStatus').value;
  const field = document.getElementById('disabilitySpecField');
  field.classList.toggle('hidden', status !== 'Yes');
}

function toggleCapacityFields() {
  const trained = document.getElementById('trainedByPartner').value;
  const fields = document.getElementById('capacityFields');
  fields.classList.toggle('hidden', trained !== 'Yes');
  
  // Required fields only when visible
  const requiredInputs = fields.querySelectorAll('input[required], select[required]');
  requiredInputs.forEach(input => {
    input.required = (trained === 'Yes');
  });
}

function togglePlacementFields() {
  const placed = document.getElementById('placedByPartner').value;
  const placementFields = document.getElementById('placementFields');
  const currentEmploymentFields = document.getElementById('currentEmploymentFields');
  
  if (placed === 'Yes') {
    placementFields.classList.remove('hidden');
    currentEmploymentFields.classList.add('hidden');
    
    // Make placement fields required
    const requiredInputs = placementFields.querySelectorAll('input[required], select[required]');
    requiredInputs.forEach(input => input.required = true);
  } else {
    placementFields.classList.add('hidden');
    currentEmploymentFields.classList.remove('hidden');
    
    // Remove required from placement fields
    const requiredInputs = placementFields.querySelectorAll('input[required], select[required]');
    requiredInputs.forEach(input => input.required = false);
  }
}

function togglePreviousTrainingDetails() {
  const hasPrevious = document.getElementById('previousTrainings').value;
  const details = document.getElementById('previousTrainingDetails');
  details.classList.toggle('hidden', hasPrevious !== 'Yes');
}

function toggleCurrentEmploymentDetails() {
  const employed = document.getElementById('currentlyEmployed').value;
  const details = document.getElementById('currentEmploymentDetails');
  details.classList.toggle('hidden', employed !== 'Yes');
}

// ===== CALCULATIONS =====
function calculateAge() {
  const dob = document.getElementById('dob').value;
  if (!dob) {
    document.getElementById('age').value = '';
    document.getElementById('participantTypeAge').value = '';
    return;
  }
  
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  document.getElementById('age').value = age;
  document.getElementById('participantTypeAge').value = (age >= 15 && age <= 35) ? 'Youth' : 'Non-Youth';
}

// ===== ID GENERATION =====
function onPartnerChange() {
  const partner = document.getElementById('implementingPartner').value;
  updatePartnerDisplays();
  
  if (partner) {
    // Note: Actual Participant ID is generated server-side on submit
    // This is just a preview for the collector
    const prefix = CONFIG.PARTNER_PREFIXES[partner] || partner.substring(0, 3).toUpperCase();
    document.getElementById('participantId').placeholder = `${prefix}--0000001 (will be generated)`;
  }
}

function updatePartnerDisplays() {
  const partner = document.getElementById('implementingPartner').value;
  const displayName = partner || 'the implementing partner';
  document.getElementById('partnerNameDisplay').textContent = displayName;
  document.getElementById('partnerNameDisplay2').textContent = displayName;
}

function generateSubmissionId(region) {
  const regionPrefix = region ? region.substring(0, 3).toUpperCase() : 'XXX';
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '').replace('Z', '');
  
  // In production, this counter would be server-managed
  // For demo, we use a simple increment
  if (!formState.regionCounter[regionPrefix]) {
    formState.regionCounter[regionPrefix] = 0;
  }
  formState.regionCounter[regionPrefix]++;
  
  const index = String(formState.regionCounter[regionPrefix]).padStart(6, '0');
  return `${regionPrefix}-${index}-${timestamp}`;
}

function generateDeviceId() {
  // Simple device fingerprint for demo
  const ua = navigator.userAgent;
  const platform = navigator.platform;
  const lang = navigator.language;
  const hash = `${ua}${platform}${lang}${Date.now()}`.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  return `DEV-${Math.abs(hash).toString(36).toUpperCase().substring(0, 8)}`;
}

// ===== VALIDATION =====
function validatePhone() {
  const phone = document.getElementById('telephone').value.replace(/\D/g, '');
  const field = document.getElementById('telephone');
  
  if (phone && !/^0\d{9}$/.test(phone)) {
    field.setCustomValidity('Phone must be 10 digits starting with 0 (e.g., 0244111111)');
    field.reportValidity();
  } else {
    field.setCustomValidity('');
  }
}

function validateGhanaCard() {
  const id = document.getElementById('ghanaCardId').value.replace(/\D/g, '');
  const field = document.getElementById('ghanaCardId');
  
  if (id && id.length !== 10) {
    field.setCustomValidity('Ghana Card must contain exactly 10 digits');
    field.reportValidity();
  } else {
    field.setCustomValidity('');
  }
}

function validateForm() {
  const form = document.getElementById('questionnaireForm');
  
  // Check required fields in visible sections
  const visibleRequired = form.querySelectorAll(':not(.hidden) [required]');
  let isValid = true;
  
  visibleRequired.forEach(field => {
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add('error');
      field.reportValidity();
    } else {
      field.classList.remove('error');
    }
  });
  
  return isValid && form.checkValidity();
}

// ===== SUBMISSION =====
async function submitForm() {
  if (formState.isSubmitting) return;
  
  if (!validateForm()) {
    showToast('Please fill all required fields', 'error');
    return;
  }
  
  formState.isSubmitting = true;
  const submitBtn = document.getElementById('submitBtn');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span class="spinner"></span> Submitting...';
  submitBtn.disabled = true;
  
  try {
    // Collect form data
    const formData = collectFormData();
    
    // Show status
    showStatus(navigator.onLine ? '🟢 Online - Syncing...' : '🔴 Offline - Saving locally...', navigator.onLine ? 'online' : 'offline');
    
    // Submit to backend
    const response = await fetch(CONFIG.API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (result.status === 'OK') {
      // Show success
      document.getElementById('refDisplay').textContent = result.referenceId || 'N/A';
      document.getElementById('questionnaireForm').classList.add('hidden');
      document.getElementById('successMessage').classList.remove('hidden');
      
      // Reset form state for next submission
      formState.isSubmitting = false;
    } else {
      throw new Error(result.message || 'Submission failed');
 there was an error during submission');
    }
    
  } catch (error) {
    console.error('Submission error:', error);
    showToast(`Error: ${error.message}`, 'error');
    formState.isSubmitting = false;
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
  }
}

function collectFormData() {
  const region = document.getElementById('region').value;
  const timestamp = new Date().toISOString();
  
  // Collect modules (checkboxes)
  const modules = Array.from(document.querySelectorAll('input[name="modules"]:checked'))
    .map(cb => cb.value);
  
  return {
    // Section A: Meta
    submissionId: generateSubmissionId(region),
    collectorName: document.getElementById('collectorName').value,
    deviceId: formState.deviceId,
    submissionTimestamp: timestamp,
    
    // Section B: General
    hamisId: document.getElementById('hamisId').value,
    onboardingDate: document.getElementById('onboardingDate').value,
    implementingPartner: document.getElementById('implementingPartner').value,
    region: region,
    district: document.getElementById('district').value,
    community: document.getElementById('community').value,
    locationStatus: document.getElementById('locationStatus').value,
    surname: document.getElementById('surname').value,
    firstName: document.getElementById('firstName').value,
    otherNames: document.getElementById('otherNames').value,
    sex: document.getElementById('sex').value,
    dob: document.getElementById('dob').value,
    age: document.getElementById('age').value,
    participantTypeAge: document.getElementById('participantTypeAge').value,
    telephone: document.getElementById('telephone').value,
    idType: document.getElementById('idType').value,
    ghanaCardId: document.getElementById('ghanaCardId').value,
    voterId: document.getElementById('voterId').value,
    refugeeStatus: document.getElementById('refugeeStatus').value,
    nationality: document.getElementById('nationality').value,
    disabilityStatus: document.getElementById('disabilityStatus').value,
    disabilitySpecify: document.getElementById('disabilitySpecify').value,
    educationLevel: document.getElementById('educationLevel').value,
    employmentStatus: document.getElementById('employmentStatus').value,
    currentOccupation: document.getElementById('currentOccupation').value,
    monthlyIncome: document.getElementById('monthlyIncome').value,
    incomeFrequency: document.getElementById('incomeFrequency').value,
    
    // Section C: Capacity Building
    trainedByPartner: document.getElementById('trainedByPartner').value,
    trainingStartDate: document.getElementById('trainingStartDate').value,
    trainingEndDate: document.getElementById('trainingEndDate').value,
    trainingLocation: document.getElementById('trainingLocation').value,
    trainingMode: document.getElementById('trainingMode').value,
    trainerType: document.getElementById('trainerType').value,
    trainingPartner: document.getElementById('trainingPartner').value,
    completionStatus: document.getElementById('completionStatus').value,
    certificateIssued: document.getElementById('certificateIssued').value,
    modules: modules.join(', '),
    wishTraining: document.getElementById('wishTraining').value,
    previousTrainings: document.getElementById('previousTrainings').value,
    previousTrainingDesc: document.getElementById('previousTrainingDesc').value,
    
    // Section D: Placement
    placedByPartner: document.getElementById('placedByPartner').value,
    placementStartDate: document.getElementById('placementStartDate').value,
    placementRegion: document.getElementById('placementRegion').value,
    placementDistrict: document.getElementById('placementDistrict').value,
    placementCommunity: document.getElementById('placementCommunity').value,
    sector: document.getElementById('sector').value,
    industry: document.getElementById('industry').value,
    jobType: document.getElementById('jobType').value,
    jobRole: document.getElementById('jobRole').value,
    employmentType: document.getElementById('employmentType').value,
    employmentCategory: document.getElementById('employmentCategory').value,
    placementIncome: document.getElementById('placementIncome').value,
    placementIncomeFreq: document.getElementById('placementIncomeFreq').value,
    employerName: document.getElementById('employerName').value,
    contractType: document.getElementById('contractType').value,
    workHours: document.getElementById('workHours').value,
    
    // Current employment (if not placed)
    currentlyEmployed: document.getElementById('currentlyEmployed').value,
    currentEmployer: document.getElementById('currentEmployer').value,
    currentJobRoleAlt: document.getElementById('currentJobRoleAlt').value,
    currentIncomeAlt: document.getElementById('currentIncomeAlt').value
  };
}

function resetForm() {
  document.getElementById('questionnaireForm').reset();
  document.getElementById('questionnaireForm').classList.remove('hidden');
  document.getElementById('successMessage').classList.add('hidden');
  
  // Reset conditional sections
  document.getElementById('capacityFields').classList.add('hidden');
  document.getElementById('placementFields').classList.add('hidden');
  document.getElementById('currentEmploymentFields').classList.add('hidden');
  document.getElementById('nationalityField').classList.add('hidden');
  document.getElementById('disabilitySpecField').classList.add('hidden');
  document.getElementById('previousTrainingDetails').classList.add('hidden');
  document.getElementById('currentEmploymentDetails').classList.add('hidden');
  
  // Reset disables
  document.getElementById('district').disabled = true;
  document.getElementById('industry').disabled = true;
  document.getElementById('jobType').disabled = true;
  document.getElementById('jobRole').disabled = true;
  document.getElementById('placementDistrict').disabled = true;
  
  // Reset dates
  document.getElementById('onboardingDate').valueAsDate = new Date();
  
  // Reset ID preview
  document.getElementById('participantId').placeholder = 'Will auto-generate';
  
  // Reset status
  hideStatus();
  
  // Re-enable submit button
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = false;
  submitBtn.innerHTML = `
    <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
    </svg>
    Submit Response
  `;
  formState.isSubmitting = false;
}

// ===== UI UTILITIES =====
function showToast(message, type = 'info') {
  // Create or get toast element
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  
  toast.textContent = message;
  toast.className = `toast toast-${type}`;
  toast.classList.remove('hidden');
  
  setTimeout(() => toast.classList.add('hidden'), 4000);
}

function showStatus(message, type) {
  const bar = document.getElementById('statusBar');
  const text = document.getElementById('statusText');
  
  text.textContent = message;
  bar.className = `status-bar ${type}`;
  bar.classList.remove('hidden');
}

function hideStatus() {
  document.getElementById('statusBar').classList.add('hidden');
}

function updateOnlineStatus() {
  const bar = document.getElementById('statusBar');
  const text = document.getElementById('statusText');
  
  if (navigator.onLine) {
    text.textContent = '🟢 Online - Data will sync immediately';
    bar.className = 'status-bar online';
  } else {
    text.textContent = '🔴 Offline - Data saved locally, will sync when online';
    bar.className = 'status-bar offline';
  }
  
  // Auto-hide after 4 seconds unless submitting
  if (!formState.isSubmitting) {
    setTimeout(() => bar.classList.add('hidden'), 4000);
  }
}

// ===== CSS for Toast (append to styles.css if needed) =====
/*
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  color: white;
  font-weight: 500;
  font-size: 0.9375rem;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
  max-width: 300px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.toast.toast-info { background: #0b66c3; }
.toast.toast-success { background: #059669; }
.toast.toast-error { background: #dc2626; }
.toast.hidden { display: none; }
@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  vertical-align: middle;
  margin-right: 0.5rem;
}
@keyframes spin { to { transform: rotate(360deg); } }
*/

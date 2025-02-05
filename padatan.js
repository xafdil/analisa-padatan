        // Function to clone and append press containers
        function addPresses() {
            let container = document.getElementById('presses');
            let pressTemplate = container.querySelector('.press-container');
            for (let i = 2; i <= 4; i++) {
                let newPress = pressTemplate.cloneNode(true);
                newPress.querySelector('h3').textContent = `Press ${i}`;
                Array.from(newPress.querySelectorAll('input, .results')).forEach(el => {
                    el.id = el.id ? el.id.replace('1', i) : '';
                });
                Array.from(newPress.querySelectorAll('.TotalNut, .BrokenNut')).forEach(el => {
                    el.className = el.className.replace('Press1', `Press${i}`);
                });
                container.appendChild(newPress);
            }
        }

        function addClaybaths() {
            let container = document.getElementById('claybaths'); // Get the container element with ID 'claybaths'
            let claybathTemplate = container.querySelector('.claybath-container'); // Find the template inside the container
            for (let i = 2; i <= 2; i++) { // Loop to create additional claybath containers (if needed)
                let newClaybath = claybathTemplate.cloneNode(true); // Clone the template
                newClaybath.querySelector('h2').textContent = `Shell Claybath ${i}`; // Update the heading text
                Array.from(newClaybath.querySelectorAll('input, .results')).forEach(el => { // Find all inputs and elements with class 'results'
                    el.id = el.id ? el.id.replace('1', i) : ''; // Update their IDs by replacing '1' with the current loop index
                });
                Array.from(newClaybath.querySelectorAll('.NUSCH, .NPSCH, .KUSCH, .KPSCH, .TotalKernel')).forEach(el => { // Find elements with specific classes
                    el.className = el.className.replace('Claybath1', `Claybath${i}`); // Update their class names to reflect the claybath number
                });
                container.appendChild(newClaybath); // Append the cloned container to the main container
            }
        }

        // Function to clone and append kernel containers
        function addKernels() {
            let container = document.getElementById('kernels');
            let kernelTemplate = container.querySelector('.kernel-container');
            const kernelNames = ['Ex Kernel Grading', 'Kernel Gabungan', 'Kernel Produksi'];
            
            for (let i = 2; i <= 4; i++) {
                let newKernel = kernelTemplate.cloneNode(true);
                newKernel.querySelector('h2').textContent = kernelNames[i - 2];
                Array.from(newKernel.querySelectorAll('input, .results')).forEach(el => {
                    el.id = el.id ? el.id.replace('1', i) : '';
                });
                Array.from(newKernel.querySelectorAll('.NUKH, .NPKH, .KPKH, .CKH, .KOTORAN')).forEach(el => {
                    el.className = el.className.replace('Kernel1', `Kernel${i}`);
                });
                container.appendChild(newKernel);
            }
        }

        // Function to clone and append ripple mill containers
        function addRipples() {
            let container = document.getElementById('ripples');
            let rippleTemplate = container.querySelector('.ripple-container');
            for (let i = 2; i <= 3; i++) {
                let newRipple = rippleTemplate.cloneNode(true);
                newRipple.querySelector('h2').textContent = `Ripple Mill ${i}`;
                Array.from(newRipple.querySelectorAll('input, .results')).forEach(el => {
                    el.id = el.id ? el.id.replace('1', i) : '';
                });
                Array.from(newRipple.querySelectorAll('.EFFICIENCY, .EFFICIENCYH')).forEach(el => {
                    el.className = el.className.replace('Ripple1', `Ripple${i}`);
                });
                container.appendChild(newRipple);
            }
        }

        // Add additional presses, kernels, and ripple mills on page load
        addPresses();
        addClaybaths();
        addKernels();
        addRipples();


        // Custom rounding function
        function customRound(number) {
            let strNum = number.toFixed(3); // Get three decimal places for checking
            let parts = strNum.split('.');
            let decimal = parts[1];
            
            if (decimal[2] >= 5) { // Check the third digit after the decimal
                // Round up the second decimal place if the third is 5 or greater
                let secondDigit = parseInt(decimal[1]);
                if (secondDigit < 9) {
                    return `${parts[0]}.${decimal[0]}${secondDigit + 1}`;
                } else {
                    // If second digit is 9, round up the first digit and reset the second to 0
                    let firstDigit = parseInt(parts[0]);
                    return `${firstDigit + 1}.00`;
                }
            } else {
                // If the third digit is less than 5, just round to two decimal places
                return number.toFixed(2);
            }
        }

        // Function to calculate results for all calculators
        function calculateAll() {
            // Press Cake Fibre Calculation
            for (let i = 1; i <= 4; i++) {
                const NutUtuh = parseFloat(document.getElementById(`NutUtuh${i}`).value) || 0;
                const NutPecah = parseFloat(document.getElementById(`NutPecah${i}`).value) || 0;
                const KernelUtuh = parseFloat(document.getElementById(`KernelUtuh${i}`).value) || 0;
                const KernelPecah = parseFloat(document.getElementById(`KernelPecah${i}`).value) || 0;
                const Cangkang = parseFloat(document.getElementById(`Cangkang${i}`).value) || 0;

                const TotalNut = NutUtuh + NutPecah + KernelUtuh + KernelPecah + Cangkang;
                const BrokenNut = TotalNut === 0 ? 0 : ((TotalNut - NutUtuh) / TotalNut) * 100;

                document.querySelector(`.TotalNut.Press${i}`).textContent = TotalNut.toFixed(2);
                document.querySelector(`.BrokenNut.Press${i}`).textContent = BrokenNut.toFixed(2);
            }

            // Shell Claybath Calculation
            for (let i = 1; i <= 4; i++) {
                const NUSC = parseFloat(document.getElementById(`NUSC${i}`).value) || 0;
                const NPSC = parseFloat(document.getElementById(`NPSC${i}`).value) || 0;
                const KUSC = parseFloat(document.getElementById(`KUSC${i}`).value) || 0;
                const KPSC = parseFloat(document.getElementById(`KPSC${i}`).value) || 0;

                const NUSCH = NUSC * 0.04; // Formula: (nusc * 40%) / 10 = nusch
                const NPSCH = NPSC * 0.05; // Formula: (npsc * 50%) / 10 = npsch
                const KUSCH = KUSC / 10; // Formula: (kusc / 10%) / 10 = kusch
                const KPSCH = KPSC / 10; // Formula: (kpsc / 10%) / 10 = kpsch
                const TotalKernel = NUSCH + NPSCH + KUSCH + KPSCH; 

                document.querySelector(`.NUSCH.Claybath${i}`).textContent = NUSCH.toFixed(2);
                document.querySelector(`.NPSCH.Claybath${i}`).textContent = NPSCH.toFixed(2);
                document.querySelector(`.KUSCH.Claybath${i}`).textContent = KUSCH.toFixed(2);
                document.querySelector(`.KPSCH.Claybath${i}`).textContent = KPSCH.toFixed(2);
                document.querySelector(`.TotalKernel.Claybath${i}`).textContent = TotalKernel.toFixed(2);
            }

            // Kernel Calculation
            for (let i = 1; i <= 4; i++) {
                const NUK = parseFloat(document.getElementById(`NUK${i}`).value) || 0;
                const NPK = parseFloat(document.getElementById(`NPK${i}`).value) || 0;
                const KPK = parseFloat(document.getElementById(`KPK${i}`).value) || 0;
                const CK = parseFloat(document.getElementById(`CK${i}`).value) || 0;

                const NUKH = customRound(NUK * 0.06); // (nuk * 60%) / 10 = nukh
                const NPKH = customRound(NPK * 0.05); // (npk * 50%) / 10 = npkh
                const KPKH = customRound(KPK / 10);   // (kpk / 10) = kpkh
                const CKH = customRound(CK / 10);     // (ck / 10) = ckh

                const KOTORAN = customRound(parseFloat(NUKH) + parseFloat(NPKH) + parseFloat(CKH));

                document.querySelector(`.NUKH.Kernel${i}`).textContent = NUKH;
                document.querySelector(`.NPKH.Kernel${i}`).textContent = NPKH;
                document.querySelector(`.KPKH.Kernel${i}`).textContent = KPKH;
                document.querySelector(`.CKH.Kernel${i}`).textContent = CKH;
                document.querySelector(`.KOTORAN.Kernel${i}`).textContent = KOTORAN + '%';
            }

            // Ripple Mill Calculation
            for (let i = 1; i <= 3; i++) {
                const NUR = parseFloat(document.getElementById(`NUR${i}`).value) || 0;
                const NPR = parseFloat(document.getElementById(`NPR${i}`).value) || 0;

                const EFFICIENCY = 1000 - NUR - NPR; // Formula: 1000 - NUR - NPR = Efficiency
                const EFFICIENCYH = EFFICIENCY / 10; // Formula: Efficiency / 10 = Efficiencyh

                document.querySelector(`.EFFICIENCY.Ripple${i}`).textContent = EFFICIENCY.toFixed(2);
                document.querySelector(`.EFFICIENCYH.Ripple${i}`).textContent = EFFICIENCYH.toFixed(2);
            }
        }

        // Function to reset all inputs and results
        function resetAll() {
            // Reset Press Cake Fibre Calculator
            for (let i = 1; i <= 4; i++) {
                document.getElementById(`NutUtuh${i}`).value = '';
                document.getElementById(`NutPecah${i}`).value = '';
                document.getElementById(`KernelUtuh${i}`).value = '';
                document.getElementById(`KernelPecah${i}`).value = '';
                document.getElementById(`Cangkang${i}`).value = '';
                document.querySelector(`.TotalNut.Press${i}`).textContent = '0.00';
                document.querySelector(`.BrokenNut.Press${i}`).textContent = '0.00';
            }

            // Reset Shell Claybath Calculator
            for (let i = 1; i <= 4; i++) {
                document.getElementById(`NUSC${i}`).value = '';
                document.getElementById(`NPSC${i}`).value = '';
                document.getElementById(`KUSC${i}`).value = '';
                document.getElementById(`KPSC${i}`).value = '';
                document.querySelector(`.NUSCH.Claybath${i}`).textContent = '0.00';
                document.querySelector(`.NPSCH.Claybath${i}`).textContent = '0.00';
                document.querySelector(`.KUSCH.Claybath${i}`).textContent = '0.00';
                document.querySelector(`.KPSCH.Claybath${i}`).textContent = '0.00';
                document.querySelector(`.TotalKernel.Claybath${i}`).textContent = '0.00';
            }

            // Reset Kernel Calculator
            for (let i = 1; i <= 4; i++) {
                document.getElementById(`NUK${i}`).value = '';
                document.getElementById(`NPK${i}`).value = '';
                document.getElementById(`KPK${i}`).value = '';
                document.getElementById(`CK${i}`).value = '';
                document.querySelector(`.NUKH.Kernel${i}`).textContent = '0.00';
                document.querySelector(`.NPKH.Kernel${i}`).textContent = '0.00';
                document.querySelector(`.KPKH.Kernel${i}`).textContent = '0.00';
                document.querySelector(`.CKH.Kernel${i}`).textContent = '0.00';
                document.querySelector(`.KOTORAN.Kernel${i}`).textContent = '0.00';
            }

            // Reset Ripple Mill Calculator
            for (let i = 1; i <= 3; i++) {
                document.getElementById(`NUR${i}`).value = '';
                document.getElementById(`NPR${i}`).value = '';
                document.querySelector(`.EFFICIENCY.Ripple${i}`).textContent = '0.00';
                document.querySelector(`.EFFICIENCYH.Ripple${i}`).textContent = '0.00';
            }
        }

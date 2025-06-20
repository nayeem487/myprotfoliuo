document.addEventListener('DOMContentLoaded', () => {
    // Burger Menu Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav ul');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
        });
    }
    // Mock data for all papers
    const allPapers = {
        'B.Tech': {
            'Computer Science': {
                '2023': 'dummy.pdf',
                '2022': 'dummy.pdf',
                '2021': 'dummy.pdf',
            },
            'Mechanical Engineering': {
                '2023': 'dummy.pdf',
                '2022': 'dummy.pdf',
            }
        },
        'MBA': {
            'Business Analytics': {
                '2022': 'dummy.pdf',
                '2021': 'dummy.pdf',
            }
        }
    };



    // Paper Repository Page
    if (document.querySelector('.paper-list')) {
        const paperList = document.querySelector('.paper-list');
        const courseFilter = document.getElementById('course-filter');
        const yearFilter = document.getElementById('year-filter');

        const renderPapers = (papers) => {
            paperList.innerHTML = '';
            for (const course in papers) {
                for (const subject in papers[course]) {
                    const item = document.createElement('div');
                    item.className = 'paper-card';
                    let yearLinks = '';
                    for (const year in papers[course][subject]) {
                        yearLinks += `<a href="${papers[course][subject][year]}" class="download-btn" target="_blank">${year}</a>`;
                    }
                    item.innerHTML = `
                        <h3>${subject}</h3>
                        <p>${course}</p>
                        <div class="year-links">${yearLinks}</div>
                    `;
                    paperList.appendChild(item);
                }
            }
        };

        const filterPapers = () => {
            const selectedCourse = courseFilter.value;
            const selectedYear = yearFilter.value;
            let filteredPapers = {};

            if (selectedCourse && allPapers[selectedCourse]) {
                filteredPapers[selectedCourse] = {};
                for (const subject in allPapers[selectedCourse]) {
                    if (selectedYear) {
                        if (allPapers[selectedCourse][subject][selectedYear]) {
                            if (!filteredPapers[selectedCourse][subject]) {
                                filteredPapers[selectedCourse][subject] = {};
                            }
                            filteredPapers[selectedCourse][subject][selectedYear] = allPapers[selectedCourse][subject][selectedYear];
                        }
                    } else {
                        filteredPapers[selectedCourse][subject] = allPapers[selectedCourse][subject];
                    }
                }
            } else if (selectedYear) {
                for (const course in allPapers) {
                    for (const subject in allPapers[course]) {
                        if (allPapers[course][subject][selectedYear]) {
                            if (!filteredPapers[course]) {
                                filteredPapers[course] = {};
                            }
                            if (!filteredPapers[course][subject]) {
                                filteredPapers[course][subject] = {};
                            }
                            filteredPapers[course][subject][selectedYear] = allPapers[course][subject][selectedYear];
                        }
                    }
                }
            } else {
                filteredPapers = allPapers;
            }

            renderPapers(filteredPapers);
        };

        courseFilter.addEventListener('change', filterPapers);
        yearFilter.addEventListener('change', filterPapers);

        // Initial render
        renderPapers(allPapers);
    }

    // Upload Page
    if (document.getElementById('upload-form')) {
        const uploadForm = document.getElementById('upload-form');
        uploadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Upload functionality is not implemented in this demo.');
            // In a real application, you would handle file upload here.
        });
    }

    // Admin Panel - Paper Management
    if (document.getElementById('paper-management')) {
        const paperManagement = document.getElementById('paper-management');

        const renderAdminPapers = () => {
            paperManagement.innerHTML = '';
            for (const course in allPapers) {
                for (const subject in allPapers[course]) {
                    for (const year in allPapers[course][subject]) {
                        const item = document.createElement('div');
                        item.className = 'paper-admin-card';
                        item.innerHTML = `
                            <span>${course} - ${subject} - ${year}</span>
                            <div>
                                <button class="edit-btn">Edit</button>
                                <button class="delete-btn">Delete</button>
                            </div>
                        `;
                        paperManagement.appendChild(item);
                    }
                }
            }
        };

        renderAdminPapers();
    }
});
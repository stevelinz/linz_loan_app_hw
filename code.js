$(document).ready(function () {


// Object containing the validation rules
    var myRules =
        {
            salary: {
                required: true,
                min: 1,
                max: 100000000,
                digits: true
            },
            credit: {
                required: true,
                min: 250,
                max: 850,
                digits: true
            },
            job: {
                required: true,
                min: 1,
                max: 480,
                digits: true
            }
        };
// Object containing the error messages
    var myMessages =
        {
            salary: {
                required: "You must demonstrate gainful employment.",
                min: "Must be a number and can't be negative.",
                max: "Must be a number, can't be negative, or your yearly salary is high enough " +
                    "to possibly qualify you for Diamond Lending Bank's Premier Plan, " +
                    "call 888-555-0000 to speak to a Senior banker.",
                digits: true
            },
            credit: {
                required: "Must be a number, and can't be negative.",
                min: "Must be a number, can't be negative, or too low of a FICO.",
                max: "Must be a number, can't be negative, or too high to be a FICO score.",
                digits: true
            },
            job: {
                required: "Must be a number, and can't be negative.",
                min: "Must be a number, can't be negative, or zero.",
                max: "Must be a number, can't be negative, or can't be that many years.",
                digits: true
            }

        };

// Pass the configuration to the form's validate() method
// Needs submitHandler, rules, and messages properties
    $("form").validate(
        {
            submitHandler: calculateLoan,
            rules: myRules,
            messages: myMessages
        }
    );

    var salaryPass = false, creditPass = false, jobPass = false;
    var salaryYearly = 0, creditScore = 0, jobMonths = 0;
    $("#resetButton").hide();


    function showResult() {
        $("#salaryShow").text("Salary: " + salaryYearly);
        $("#creditShow").text("FICO: " + creditScore);
        if(!isNaN(jobMonths)) {
            $("#jobShow").text("Months on the Job: " + jobMonths);
            salaryYearly = 0; creditScore = 0; jobMonths = 0;
        }
    }

    function jobCheck() {
        if (jobMonths > 12) {
            $("#message").text("LOAN APPROVED");
            showResult();
        } else {
            $("#message").text("LOAN DENIED");
            showResult()
        }

    }

    function calculateLoan() {
        $("img").hide();
        salaryYearly = parseInt($("#salary").val());
        creditScore = parseInt($("#credit").val());
        jobMonths = parseInt($("#job").val());

        if (salaryYearly >= 40000) {
            salaryPass = true;
        }
        if (salaryPass === true && creditScore >= 600) {
            $("#message").text("LOAN APPROVED");
            showResult();
        }
        else if (salaryPass === true && creditScore < 600) {
            document.getElementById("hiding").
            removeAttribute("hidden");
            if (jobMonths === undefined || jobMonths > 0) {
                jobCheck();
            }
        }
        if (salaryPass === false && creditScore < 600) {
            $("#message").text("LOAN DENIED");
            showResult();
        }
        else if(salaryPass === false && creditScore >= 600) {
            document.getElementById("hiding").removeAttribute("hidden");
        }
        if (jobMonths === undefined || jobMonths > 0) {
            jobCheck();
        }
    }


});






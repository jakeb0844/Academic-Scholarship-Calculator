let Scholarship,
  ScholarshipAmount,
  OnCampus,
  Residency,
  TestType,
  Visiting,
  Classification,
  PTK;

const FormElement = $("form");

const OnCampusEl = $("#staying-on-campus");

const VisitingEl = $("#visiting");

const ResidencyEl = $("#residency");

const ClassificationEl = $("#classification");

const ACTSelect = $("#act-scores");
const SATSelect = $("#sat-scores");
const CLTSelect = $("#clt-scores");
const GPASelect = $("#freshman-gpa-scores");

$('button[type="submit"]').on("click", function (e) {
  e.preventDefault();
  //Start Calucation
  StartCalculation();
});


$('input[name="test-types"]').on("change", function () {
  HideAllTestScores();
  switch (this.value) {
    case "ACT":
      ShowTestScore(ACTSelect);
      break;
    case "SAT":
      ShowTestScore(SATSelect);
      break;
    case "CLT":
      ShowTestScore(CLTSelect);
      break;
  }
  TestType = this.value;
  console.log(`Test Type: ${TestType}`);
});

$('input[name="residency"]').on("change", function () {
  Residency = this.value;
});

$('input[name="staying-on-campus"]').on("change", function () {
  if (this.value == "yes") {
    OnCampus = true;
  } else {
    OnCampus = false;
  }
});

$('input[name="classification"]').on("change", function () {
  if (this.value == "freshman") {
    Classification = "freshman";
    ShowElement("#freshman-gpa-scores");
    HideElement("#transfer-gpa-scores");
    ShowElement("#test-types");
    HideElement("#PTK");
  } else if (this.value == "transfer") {
    Classification = "transfer";
    HideAllTestScores();
    HideElement("#freshman-gpa-scores");
    ShowElement("#transfer-gpa-scores");
    HideElement("#test-types");
    ShowElement("#PTK");
  }
});

function HideAllTestScores() {
  ACTSelect.addClass("hide");
  SATSelect.addClass("hide");
  CLTSelect.addClass("hide");
}

function ShowTestScore(TestType) {
  console.log("showtests");
  TestType.removeClass("hide");
}

function reset() {
  RemoveErrorBoxes();
  HideElement("#error-message");
  HideElement("#visit-message");
  HideElement("#speed-message");
  HideElement('#fasfa-message');
  HideElement("#testtype-none-message")
  $("#other-scholarship-opportunities").parent().removeClass("hide");
  $("#other-scholarship-opportunities").empty();
  $("#scholarship-details").empty();
  $("#total").html("<h3>$0</h3>");
  $("#title").html("<h4>TOTAL SCHOLARSHIPS ANNUALLY</h4>");
}

function StartCalculation() {
  const TestScore = GetTestScore();
  const GPA = GetGPA();
  let total = 0;
  let Scholarship;

  reset();

  if (validateForm(TestScore, GPA)) {
const speed = CheckForSpeedScholarship();
	if (speed) {
		$("#scholarship-details").empty();
		AddToList(
		  "#scholarship-details",
		  "<a href='https://www.mc.edu/speed'>Speed Scholarship</a>"
		);
		$("#total").html("<h3>100%</h3>");
		$("#title").html("<h4>FULL TUITION SCHOLARSHIP</h4>");
		$("#other-scholarship-opportunities").parent().addClass("hide");
		return null;
	  }


	const NoTestSubmitted = CheckForNoTestScoreSubmittion();

	if(NoTestSubmitted){
		Scholarship = {"amount": OppurtunityGrant["freshman_gpas"][5][(OnCampus == "yes" ? "oncampus" : "offcampus")],"name": OppurtunityGrant.name};
	}
	else{
		Scholarship = CalculateScholarship(TestScore, GPA);
	}

    AddToList(
      "#scholarship-details",
      Scholarship.amount + " " + Scholarship.name
    );
    let amount = Scholarship.amount;
    amount = amount.replace("$", "");
    amount = amount.replace(",", "");
    total += Number(amount);

    
    const visit = CheckForVisitScholarship();
	const fasfa = CheckForFasfa();

    if (visit) {
      AddToList(
        "#scholarship-details",
        "$1,250 Visit Scholarship <a href='https://www.mc.edu/visit/schedule-your-visit'>(Schedule it now)</a>"
      );
      total += 1250;
    }

	if(fasfa){
		AddToList(
            "#scholarship-details",
            "$1,250 Sending Fasfa"
        );

		total += 1250;
	}

    console.log(total);

    $("#total").html(
      `<h3>$${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>`
    );

	//Other Scholarship Opportunities
	if(CheckForTransferCompeition(GPA)){
		AddToList(
			"#other-scholarship-opportunities",
			"You qualify to participate in our <a href='https://www.mc.edu/admissions/undergraduate/events/transfer'>Transfer Competition</a> with scholarships worth an additional $500 to $10,000 per year!"
		  );
	}

	if(CheckForTrusteeScholarship(Scholarship)){
		console.log("Trustee Scholarship");
		AddToList(
			"#other-scholarship-opportunities",
			"You qualify for our most <a href='https://www.mc.edu/admissions/undergraduate/events/selectscholars'>prestigious competition</a> that offers up to full-tuition scholarships!"
		  );
    }

	if(visit){
		AddToList(
            "#other-scholarship-opportunities",
			"Schedule your <a href='https://www.mc.edu/visit/'>visit</a> now to qualify for the Visit scholarship"
		);
	}
	
  }
}

function AddToList(ParentID, data) {
  $(ParentID).append(`<li>${data}</li>`);
}

function CalculateScholarship(TestScore, GPA) {
  const Scholarship = FindScholarship(TestScore, GPA);
  console.log("160", Scholarship);

  if (Scholarship.name == "Phi Theta Kappa") {
    console.log("here");
    return {
      amount: Scholarship[OnCampus == "yes" ? "oncampus" : "offcampus"],
      name: Scholarship.name,
    };
  }

  console.log(Scholarship);
  let ScholarshipAmount;

  const TypeOfGPA =
    Classification == "freshman" ? "freshman_gpas" : "transfer_gpas";

  for (let i = 0; i < Scholarship[TypeOfGPA].length; i++) {
    if (Scholarship[TypeOfGPA][i]["gpa"] == GPA) {
      ScholarshipAmount =
        Scholarship[TypeOfGPA][i][OnCampus == "yes" ? "oncampus" : "offcampus"];

      break;
    }
  }

  return { amount: ScholarshipAmount, name: Scholarship.name };
}

function CheckForSpeedScholarship() {
  //If residency is MS and not living on campus, show message
  if (Residency == "resident" && OnCampus == "no") {
    ShowElement("#speed-message");
  } else if (Residency == "resident" && OnCampus == "yes") {
    return true;
  }

  return false;
}

function CheckForVisitScholarship() {
  //If not visiting campus, show message

  if (Residency == "resident" && Visiting == "yes" && OnCampus == "no") {
    return true;
  } else if (Residency == "non-resident" && Visiting == "yes") {
    return true;
  }

  if (Visiting == "no") {
    ShowElement("#visit-message");
  }

  return false;
}

function CheckForFasfa() {
	const val = $('#fasfa').find('input[type="radio"]:checked').val();

	if (val == "yes") {
        return true;
    }

	ShowElement('#fasfa-message');
  
	return false;
  }

function CheckForNoTestScoreSubmittion() {
  //If no test score submission, show message
  if(TestType == "NONE"){
	ShowElement("#testtype-none-message");
	return true;
  }

  return false;
}

function CheckForTransferCompeition(GPA) {
	//if transfer student and gpa is >= 3.00 and not a resident of MS

	if(Classification == "transfer" && GPA != "2.00-2.49" && GPA != "2.50-2.99" && Residency == "non-resident"){
		return true;
	}

	return false;
  }

  function CheckForTrusteeScholarship(Scholarship) {
	//if freshman student and act >= 27 || sat >= 1,260 || clt >= 84 && non-resident

	if(Classification == "freshman" && Residency == "non-resident" && (Scholarship.name == "Deans Scholarship" || Scholarship.name == "Presidential Scholarship")){
		return true;
	}

	return false;
  }
//Not certain on requirments
  function CheckForDistinctionScholarship(Scholarship) {
	//if freshman student and act >= 27 || sat >= 1,260 || clt >= 84 && non-resident

	if(Classification == "freshman" && Residency == "non-resident" && (Scholarship.name == "Deans Scholarship" || Scholarship.name == "Presidential Scholarship")){
		return true;
	}

	return false;
  }

function validateForm(TestScore, GPA) {
  //OnCampus, Residency, TestType, gpa, act/sat/CLT score, classification
  //Add parent element to array then loop through and add error box
  let elements = [];
  const OnCampusValue = $("input[name=staying-on-campus]:checked").val();
  const ResidencyValue = $("input[name=residency]:checked").val();
  const VisitingValue = $("input[name=visiting]:checked").val();
  const GPAValue = $(GPASelect).find("select").val();
  const ClassificationValue = $("input[name=classification]:checked").val();
  const PTKValue = $("input[name=ptk]:checked").val();
  const fasfaValue = $("input[name=fasfa]:checked").val();

  if (OnCampusValue == undefined) {
    elements.push(OnCampusEl);
  }
  if (ResidencyValue == undefined) {
    elements.push(ResidencyEl);
  }
  if (VisitingValue == undefined) {
    elements.push(VisitingEl);
  }
  // if (TestType == undefined) {
  //     //elements.push(TestTypeEl);
  // }
  if (Classification == "freshman" && GPAValue == null) {
    elements.push(GPASelect);
  }

  if (Classification == "transfer" && GetGPA() == null) {
    elements.push($("#transfer-gps-scores"));
  }

  if (TestScore == undefined) {
    //elements.push(TestScoreEl);
  }
  if (ClassificationValue == undefined) {
    elements.push(ClassificationEl);
	elements.push(GPASelect);
  }

  if (ClassificationValue == "transfer" && PTKValue == undefined) {
    elements.push($("#PTK"));
  }

  if(fasfaValue == undefined) {
	elements.push($('#fasfa'));
  }

  if (elements.length > 0) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].addClass("error");
    }
    //Show the error message under submit button
    ShowElement("#error-message");
    return false;
  }
  //let Scholarship, ScholarshipAmount, OnCampus, Residency, TestType, Visiting, Classification;
  OnCampus = OnCampusValue;
  Residency = ResidencyValue;
  Visiting = VisitingValue;
  Classification = ClassificationValue;

  return true;
}

function FindScholarship(TestScore, GPA) {
  if (
    Classification == "transfer" &&
    $("input[name=ptk]:checked").val() == "yes"
  ) {
    return Scholarships[Scholarships.length - 1];
  }

  //Don't include PTK so (Schoarlships.length - 1)
  for (let i = 0; i < Scholarships.length - 1; i++) {
    if (Classification == "freshman") {
      console.log("freshman");
      if (Scholarships[i][TestType] == TestScore) {
        return Scholarships[i];
      }
    } else {
      console.log(Scholarships[i]["transfer_gpas"][0]["gpa"] + " == " + GPA);
      if (Scholarships[i]["transfer_gpas"][0]["gpa"] == GPA) {
        return Scholarships[i];
      }
    }
  }

  console.log("here");

  //return null;
}

function GetTestScore() {
  if (TestType == "ACT") {
    //return value of ACTSelect
    return ACTSelect.find("select").val();
  } else if (TestType == "SAT") {
    return SATSelect.find("select").val();
  } else if (TestType == "CLT") {
    return CLTSelect.find("select").val();
  }
}

function GetGPA() {
  if (Classification == "freshman") {
    return GPASelect.find("select").val();
  }

  return $("#transfer-gpa-scores").find("select").val();
}

function RemoveErrorBoxes() {
	$('.error').removeClass('error');
}

function ShowElement(el) {
  $(el).removeClass("hide");
}

function HideElement(el) {
  $(el).addClass("hide");
}

const OppurtunityGrant = {
  freshman_gpas: [
    { gpa: "4.00", oncampus: "$11,000", offcampus: "$9,250" },
    { gpa: "3.90-3.99", oncampus: "$10,500", offcampus: "$9,000" },
    { gpa: "3.75-3.89", oncampus: "$10,000", offcampus: "$8,750" },
    { gpa: "3.50-3.74", oncampus: "$10,000", offcampus: "$8,750" },
    { gpa: "3.00-3.49", oncampus: "$10,000", offcampus: "$8,750" },
    { gpa: "Below 3.00", oncampus: "$10,000", offcampus: "$8,750" },
  ],
  transfer_gpas: [
    { gpa: "2.00-2.49", oncampus: "$8,000", offcampus: "$7,000" },
  ],
  ACT: "18-19",
  SAT: "960-1020",
  CLT: "61-65",
  name: "Oppurtunity Grant",
};

const HeritageScholarship = {
  freshman_gpas: [
    { gpa: "4.00", oncampus: "$11,000", offcampus: "$9,250" },
    { gpa: "3.90-3.99", oncampus: "$10,500", offcampus: "$9,000" },
    { gpa: "3.75-3.89", oncampus: "$10,500", offcampus: "$9,000" },
    { gpa: "3.50-3.74", oncampus: "$10,500", offcampus: "$9,000" },
    { gpa: "3.00-3.49", oncampus: "$10,500", offcampus: "$9,000" },
    { gpa: "Below 3.00", oncampus: "$10,000", offcampus: "$8,750" },
  ],
  transfer_gpas: [
    { gpa: "2.50-2.99", oncampus: "$8,500", offcampus: "$7,500" },
  ],
  ACT: "20-21",
  SAT: "1030-1090",
  CLT: "66-71",
  name: "Heritage Scholarship",
};

const ProvineScholarship = {
  freshman_gpas: [
    { gpa: "4.00", oncampus: "$11,500", offcampus: "$9,500" },
    { gpa: "3.90-3.99", oncampus: "$11,000", offcampus: "$9,250" },
    { gpa: "3.75-3.89", oncampus: "$11,000", offcampus: "$9,250" },
    { gpa: "3.50-3.74", oncampus: "$11,000", offcampus: "$9,250" },
    { gpa: "3.00-3.49", oncampus: "$10,500", offcampus: "$9,000" },
    { gpa: "Below 3.00", oncampus: "$10,000", offcampus: "$8,750" },
  ],
  transfer_gpas: [{ gpa: "-1", oncampus: "$0", offcampus: "$0" }],
  ACT: "22-23",
  SAT: "1100-1150",
  CLT: "72-75",
  name: "Provine Scholarship",
};

const HampsteadScholarship = {
  freshman_gpas: [
    { gpa: "4.00", oncampus: "$12,000", offcampus: "$9,750" },
    { gpa: "3.90-3.99", oncampus: "$11,500", offcampus: "$9,250" },
    { gpa: "3.75-3.89", oncampus: "$11,500", offcampus: "$9,250" },
    { gpa: "3.50-3.74", oncampus: "$11,000", offcampus: "$9,250" },
    { gpa: "3.00-3.49", oncampus: "$10,500", offcampus: "$9,000" },
    { gpa: "Below 3.00", oncampus: "$10,000", offcampus: "$8,750" },
  ],
  transfer_gpas: [
    { gpa: "3.00-3.49", oncampus: "$9,000", offcampus: "$8,000" },
  ],
  ACT: "24-26",
  SAT: "1160-1250",
  CLT: "76-83",
  name: "Hampstead Scholarship",
};

const DeansScholarship = {
  freshman_gpas: [
    { gpa: "4.00", oncampus: "$12,000", offcampus: "$9,750" },
    { gpa: "3.90-3.99", oncampus: "$12,000", offcampus: "$9,750" },
    { gpa: "3.75-3.89", oncampus: "$11,500", offcampus: "$9,500" },
    { gpa: "3.50-3.74", oncampus: "$11,000", offcampus: "$9,250" },
    { gpa: "3.00-3.49", oncampus: "$10,500", offcampus: "$9,000" },
    { gpa: "Below 3.00", oncampus: "$10,500", offcampus: "$9,000" },
  ],
  transfer_gpas: [
    { gpa: "3.50-3.74", oncampus: "$9,500", offcampus: "$8,500" },
  ],
  ACT: "27-28",
  SAT: "1260-1320",
  CLT: "84-88",
  name: "Deans Scholarship",
};

const PresidentialScholarship = {
  freshman_gpas: [
    { gpa: "4.00", oncampus: "$12,500", offcampus: "$10,000" },
    { gpa: "3.90-3.99", oncampus: "$12,500", offcampus: "$10,000" },
    { gpa: "3.75-3.89", oncampus: "$12,000", offcampus: "$9,750" },
    { gpa: "3.50-3.74", oncampus: "$12,000", offcampus: "$9,750" },
    { gpa: "3.00-3.49", oncampus: "$11,500", offcampus: "$9,500" },
    { gpa: "Below 3.00", oncampus: "$11,500", offcampus: "$9,500" },
  ],
  transfer_gpas: [
    { gpa: "3.75-4.00", oncampus: "$10,500", offcampus: "$9,500" },
  ],
  ACT: "29+",
  SAT: "1330+",
  CLT: "89+",
  name: "Presidential Scholarship",
};

const PTKScholarship = {
  oncampus: "$12,500",
  offcampus: "$10,500",
  name: "Phi Theta Kappa",
};

const Scholarships = GetScholarshipArray();

function GetScholarshipArray() {
  return [
    OppurtunityGrant,
    HeritageScholarship,
    ProvineScholarship,
    HampsteadScholarship,
    DeansScholarship,
    PresidentialScholarship,
    PTKScholarship,
  ];
}

function ShowOptionOne() {
  //MS Resident
  //Visit
  //On campus
  //Freshman
  //ACT
  //First score
  //gpa - first score

  $(OnCampusEl).find('input[value="yes"]').prop("checked", true);

  $(VisitingEl).find('input[value="yes"]').prop("checked", true);

  $(ResidencyEl).find('input[value="resident"]').prop("checked", true);

  $('#fasfa').find('input[value="yes"]').prop("checked",true);

  $(ClassificationEl).find('input[value="freshman"]').prop("checked", true);
  $(ClassificationEl).find('input[value="freshman"]').trigger("change");

  $("#test-types").find('input[value="ACT"]').prop("checked", true);
  $("#test-types").find('input[value="ACT"]').trigger("change");

  $("#freshman-gpa-scores")
    .find('option[value="Below 3.00"]')
    .prop("selected", true);
  $("#freshman-gpa-scores")
    .find('option[value="Below 3.00"]')
    .trigger("change");
}

function ShowOptionTwo() {
  //MS Resident
  //Visit
  //On campus
  //Freshman
  //ACT
  //First score
  //gpa - first score

  $(OnCampusEl).find('input[value="no"]').prop("checked", true);

  $(VisitingEl).find('input[value="no"]').prop("checked", true);

  $(ResidencyEl).find('input[value="resident"]').prop("checked", true);

  $(ClassificationEl).find('input[value="transfer"]').prop("checked", true);
  $(ClassificationEl).find('input[value="transfer"]').trigger("change");

  $("#PTK").find('input[value="no"]').prop("checked", true);

  // $("#test-types").find('input[value="ACT"]').prop("checked", true);
  // $("#test-types").find('input[value="ACT"]').trigger("change");

  $("#transfer-gpa-scores")
    .find('option[value="3.00-3.49"]')
    .prop("selected", true);
  $("#transfer-gpa-scores").find('option[value="3.00-3.49"]').trigger("change");
}

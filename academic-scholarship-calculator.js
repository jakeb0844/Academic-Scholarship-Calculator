let Scholarship,
  ScholarshipAmount,
  OnCampus,
  Residency,
  TestType,
  Visiting,
  Classification,
  PTK,
  Fasfa;

const OnCampusEl = $("#staying-on-campus");
const VisitingEl = $("#visiting");
const ResidencyEl = $("#residency");
const ClassificationEl = $("#classification");
const ACTSelect = $("#act-scores");
const SATSelect = $("#sat-scores");
const CLTSelect = $("#clt-scores");
const GPASelect = $("#freshman-gpa-scores");

function StartCalculation() {
  const TestScore = GetTestScore();
  const GPA = GetGPA();
  let total = 0;
  let Scholarship;

  //Hides all messages
  reset();

  if (validateForm(TestScore, GPA)) {
    //Shows the You qualify for ul
    ShowElement("#scholarship-details-div");

    const speed = CheckForSpeedScholarship();

    //Speed Scholarship, show message and breaks
    if (speed) {
      ShowSpeedScholarshipDetails();
      return;
    }

    //Get the correct Scholarship
    Scholarship = GetScholarship(TestScore, GPA);

    AddToList(
      "#scholarship-details",
      Scholarship.amount + " " + Scholarship.name
    );

    let amount = StringToInt(Scholarship.amount);

    total += amount;

    const visit = CheckForVisitScholarship();
    const fasfa = CheckForFasfa();

    if (visit) {
      AddToList("#scholarship-details", VisitScholarship["message"]);
      total += StringToInt(VisitScholarship["amount"]);
    }

    if (fasfa) {
      AddToList("#scholarship-details", FasfaScholarship["message"]);

      total += StringToInt(FasfaScholarship["amount"]);
    }

    $("#total").html(
      `<h3>$${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>`
    );

    CheckForOtherScholarshipOpportunities(GPA, Scholarship);
  }
}

function ShowSpeedScholarshipDetails() {
  $("#scholarship-details").empty();
  AddToList(
    "#scholarship-details",
    "<a href='https://www.mc.edu/speed'>Speed Scholarship</a>"
  );
  $("#total").html("<h3>100%</h3>");
  $("#title").html("<h4>FULL TUITION SCHOLARSHIP</h4>");
  //$("#other-scholarship-div").parent().addClass("hide");
  HideAllMessages();
}

function GetScholarship(TestScore, GPA) {
  const NoTestSubmitted = CheckForNoTestScoreSubmittion();
  let Scholarship;

  if (NoTestSubmitted && Classification == "freshman") {
    Scholarship = {
      amount:
        OppurtunityGrant["freshman_gpas"][5][
          OnCampus == "yes" ? "oncampus" : "offcampus"
        ],
      name: OppurtunityGrant.name,
    };
  } else {
    Scholarship = CalculateScholarship(TestScore, GPA);
  }

  return Scholarship;
}

function CheckForOtherScholarshipOpportunities(GPA, Scholarship) {
  //Other Scholarship Opportunities
  if (CheckForTransferCompeition(GPA)) {
    ShowElement("#other-scholarship-div");
    AddToList(
      "#other-scholarship-opportunities",
      "You qualify to participate in our <a href='https://www.mc.edu/admissions/undergraduate/events/transfer'>Transfer Competition</a> with scholarships worth an additional $500 to $10,000 per year!"
    );
  }

    if (CheckForTrusteeScholarship(Scholarship)) {
    ShowElement("#other-scholarship-div");
    AddToList(
      "#other-scholarship-opportunities",
      "You qualify for our <a target='_blank' rel='noopener noreferrer' href='https://www.mc.edu/admissions/undergraduate/events/selectscholars'>Select Scholars competition</a> that offers up to full-tuition scholarships!"
    );
  }

  if(CheckForHonorsScholarship(Scholarship)){
    ShowElement("#other-scholarship-div");
    AddToList(
      "#other-scholarship-opportunities",
      "You qualify for our most <a target='_blank' rel='noopener noreferrer' href='https://www.mc.edu/honors'>prestigious competition</a> that offers full-tuition scholarships!"
    );
  }
}

function CalculateScholarship(TestScore, GPA) {
  const Scholarship = FindScholarship(TestScore, GPA);

  if (Scholarship.name == "Phi Theta Kappa") {
    console.log("here");
    return {
      amount: Scholarship[OnCampus == "yes" ? "oncampus" : "offcampus"],
      name: Scholarship.name,
    };
  }

  return GetScholarshipDetails(GPA, Scholarship);
}

function GetScholarshipDetails(GPA, Scholarship) {
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
      if (Scholarships[i][TestType] == TestScore) {
        return Scholarships[i];
      }
    } else {
      if (Scholarships[i]["transfer_gpas"][0]["gpa"] == GPA) {
        return Scholarships[i];
      }
    }
  }
}

function CheckForSpeedScholarship() {
  //If residency is MS and not living on campus, show message
  if (Residency == "resident" && OnCampus == "yes") {
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

  return false;
}

function CheckForFasfa() {
  const val = $("#fasfa").find('input[type="radio"]:checked').val();

  if (val == "yes") {
    return true;
  }

  return false;
}

function CheckForNoTestScoreSubmittion() {
  //If no test score submission, show message
  if (TestType == "NONE") {
    return true;
  }

  return false;
}

function CheckForTransferCompeition(GPA) {
  //if transfer student and gpa is >= 3.00 and not a resident of MS
  if (
    Classification == "transfer" &&
    GPA != "2.00-2.49" &&
    GPA != "2.50-2.99"
  ) {
    return true;
  }

  return false;
}

function CheckForTrusteeScholarship(Scholarship) {
  //Select Scholarship
  //if freshman student and act >= 27 || sat >= 1,260 || clt >= 84 && non-resident
  if (
    Classification == "freshman" &&
    (Scholarship.name == "Deans Scholarship" ||
      Scholarship.name == "Presidential Scholarship")
  ) {
    return true;
  }

  return false;
}

function CheckForHonorsScholarship(Scholarship) {
  //if freshman student and act >= 29+ || sat >= 1330+ || clt >= 89+ 
  if(Classification == "freshman" && Scholarship.name == "Presidential Scholarship") {
    return true;
  }
  return false;
}

function validateForm() {
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
  if ($("input[name=test-types]:checked").val() == undefined) {
    elements.push($("#test-types"));
  }
  // if (Classification == "freshman" && GPAValue == null) {
  //   elements.push(GPASelect);
  // }

  if (Classification == "transfer" && GetGPA() == null) {
    elements.push($("#transfer-gps-scores"));
  }

  if (ClassificationValue == undefined) {
    elements.push(ClassificationEl);
    //elements.push(GPASelect);
  }

  if (ClassificationValue == "transfer" && PTKValue == undefined) {
    elements.push($("#PTK"));
  }

  if (fasfaValue == undefined) {
    elements.push($("#fasfa"));
  }
  
  console.log(elements)

  if (elements.length > 0) {

    for (let i = 0; i < elements.length; i++) {
      elements[i].addClass("error");
    }
  
    ShowElement("#error-message");
    return false;
  }

  return true;
}

function GetTestScore() {
  if (TestType == "ACT") {
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

function ShowSpeedMessage() {
  HideElement("#speed-message");
  if (Residency == undefined || OnCampus == undefined) return;

  if (Residency == "resident" && OnCampus == "no") {
    ShowElement("#speed-message");
  }
}

function ShowVisitMessage() {
  HideElement("#visit-message");
  if (Visiting == undefined) return;

  if (Visiting == "no") {
    ShowElement("#visit-message");
  }
}

function ShowFasfaMessage() {
  HideElement("#fasfa-message");
  if (Fasfa == undefined) return;

  if (Fasfa == "no") {
    ShowElement("#fasfa-message");
  }
}

function RemoveErrorBoxes() {
  $(".error").removeClass("error");
}

function ShowElement(el) {
  $(el).removeClass("hide");
}

function HideElement(el) {
  $(el).addClass("hide");
}

function StringToInt(str) {
  // This isn't for all strings just scholarship amounts which happen to be strings.
  // Removes the $ and comma
  str = str.replace("$", "");
  str = str.replace(",", "");
  return Number(str);
}

function AddToList(ParentID, data) {
  $(ParentID).append(`<li>${data}</li>`);
}

function HideAllTestScores() {
  ACTSelect.addClass("hide");
  SATSelect.addClass("hide");
  CLTSelect.addClass("hide");
}

function ShowTestScore(TestType) {
  TestType.removeClass("hide");
}

function reset() {
  RemoveErrorBoxes();
  HideElement("#error-message");
  HideElement("#scholarship-details-div");
  HideElement("#other-scholarship-div");
  $("#other-scholarship-opportunities").empty();
  $("#scholarship-details").empty();
  $("#total").html("<h3>$0</h3>");
  $("#title").html("<h4>TOTAL SCHOLARSHIPS ANNUALLY</h4>");
}

function HideAllMessages() {
  HideElement("#visit-message");
  HideElement("#speed-message");
  HideElement("#fasfa-message");
  HideElement("#testtype-none-message");
}

//All the scholarships for their respective names and amounts

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

const VisitScholarship = {
  amount: "$1,250",
  message:
    "$1,250 Visit Scholarship: <a href='https://www.mc.edu/visit/schedule-your-visit'>Schedule it now</a>",
};

const FasfaScholarship = {
  amount: "$1,250",
  message: "$1,250 Sending Fasfa",
};

//Takes all scholarships but Visit and Fasfa and puts them in an array
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

const Scholarships = GetScholarshipArray();

//Start of event listeners

$('button[type="submit"]').on("click", function (e) {
  e.preventDefault();
  //Start Calucation
  StartCalculation();
});

$('input[name="test-types"]').on("change", function () {
  HideAllTestScores();
  HideElement("#testtype-none-message");
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
    case "NONE":
      ShowElement("#testtype-none-message");
      break;
  }
  TestType = this.value;
});

$('input[name="residency"]').on("change", function () {
  Residency = this.value;
  ShowSpeedMessage();
});

$('input[name="visiting"]').on("change", function () {
  Visiting = this.value;
  ShowVisitMessage();
});

$('input[name="staying-on-campus"]').on("change", function () {
  OnCampus = this.value;

  ShowSpeedMessage();
});

$('input[name="fasfa"]').on("change", function () {
  Fasfa = this.value;
  ShowFasfaMessage();
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
    HideElement("#testtype-none-message");
    HideElement("#freshman-gpa-scores");
    ShowElement("#transfer-gpa-scores");
    HideElement("#test-types");
    ShowElement("#PTK");
  }
});

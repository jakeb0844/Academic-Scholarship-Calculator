<div class="border border-dark border-1 rounded" style="padding:3rem">
    <div class="row">
        <div class="col-sm-6">
            <span>
                <h2 class="m-0">Scholarship Caluclator</h2>
                <p class="scholarship-policy">Amounts shown are awarded to students per year as long as the student
                    maintains a minimum of a 2.5
                    GPA.</p>
                <div style="margin-top:-1.5rem;"><span><i>*Required</i></span></div>


            </span>
            <form>
                <!-- Residency Information -->
                <div class="form-question" id="residency" style="margin-top:1rem">
                    <span class="fw-bold">Residency Information*</span>
                    <div class="" style="margin-top:-2rem">

                        <input type="radio" class="btn-check" name="residency" id="ms-res" value="resident"
                            autocomplete="off">
                        <label class="btn grey-btn me-3" for="ms-res">MISSISSIPPI RESIDENT</label>


                        <input type="radio" class="btn-check" name="residency" id="out-of-state" value="non-resident"
                            autocomplete="off">
                        <label class="btn grey-btn" for="out-of-state">OUT OF STATE</label>
                    </div>
                </div>
                <div class="clearfix"></div>
                <!-- Visitation -->
                <div class="form-question" id="visiting">
                    <span class="fw-bold">I Will Visit MC's Campus Before Enrollment*</span>
                    <div class="" style="margin-top:-2rem">

                        <input type="radio" class="btn-check" name="visiting" id="visit-yes" value="yes"
                            autocomplete="off">
                        <label class="btn grey-btn me-3" for="visit-yes">YES</label>


                        <input type="radio" class="btn-check" name="visiting" id="visit-no" value="no"
                            autocomplete="off">
                        <label class="btn grey-btn" for="visit-no">NO</label>
                    </div>
                </div>
                <div id="visit-message" class="hide">
                    <p class="info-message">You could receive an additional $5,000 scholarship just for visiting MC's
                        Campus!</p>
                </div>
                <div class="clearfix"></div>
                <!-- On or off campus living -->
                <div class="form-question" id="staying-on-campus">
                    <span class="fw-bold">I Will Live On Campus*</span>
                    <div class="" style="margin-top:-2rem">

                        <input type="radio" class="btn-check" name="staying-on-campus" id="on-campus" value="yes"
                            autocomplete="off">
                        <label class="btn grey-btn me-3" for="on-campus">YES</label>


                        <input type="radio" class="btn-check" name="staying-on-campus" id="off-campus" value="no"
                            autocomplete="off">
                        <label class="btn grey-btn" for="off-campus">NO</label>
                    </div>
                </div>
                <div id="speed-message" class="hide">
                    <p class="info-message">As a Mississippi resident, you may qualify for the full-tuituion <a
                            target="_blank" href="https://www.mc.edu/speed">Speed Scholarship</a> by living on campus.
                    </p>
                </div>

                <div class="clearfix"></div>
                <!-- Student Classification -->
                <div class="form-question" id="classification">
                    <span class="fw-bold">I Am*</span>
                    <div class="" style="margin-top:-2rem">

                        <input type="radio" class="btn-check" name="classification" id="freshman" value="freshman"
                            autocomplete="off">
                        <label class="btn grey-btn me-3" for="freshman">Incoming Freshamn</label>

                        <input type="radio" class="btn-check" name="classification" id="transfer" value="transfer"
                            autocomplete="off">
                        <label class="btn grey-btn" for="transfer">Transfer Student</label>
                    </div>
                </div>
                <div class="clearfix"></div>
                <!-- FAFSA -->
                <div class="form-question" id="fasfa">
                    <span class="fw-bold">I will send MC my FAFSA before enrollment*</span>
                    <div class="" style="margin-top:-2rem">
                        <input type="radio" class="btn-check" name="fasfa" id="yes" value="yes" autocomplete="off">
                        <label class="btn grey-btn me-3" for="yes">Yes</label>

                        <input type="radio" class="btn-check" name="fasfa" id="no" value="no" autocomplete="off">
                        <label class="btn grey-btn" for="no">No</label>
                    </div>
                </div>
                <div id="fasfa-message" class="hide">
                    <p class="info-message">Filling out and sending the FASFA to MC grants students a $5,000 total
                        scholarship ($1,250 annually for four years).
                    </p>
                </div>
                <div class="clearfix"></div>
                <!-- PTK -->
                <div class="form-question hide" id="PTK">
                    <span class="fw-bold">I am a member of Phi theta Kappa (PTK)*</span>
                    <div class="" style="margin-top:-2rem">

                        <input type="radio" class="btn-check" name="ptk" id="ptk-yes" value="yes" autocomplete="off">
                        <label class="btn grey-btn me-3" for="ptk-yes">Yes</label>

                        <input type="radio" class="btn-check" name="ptk" id="ptk-no" value="no" autocomplete="off">
                        <label class="btn grey-btn" for="ptk-no">No</label>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="form-question hide" id="test-types">
                    <span class="fw-bold">I Am Submitting Test Scores For*</span>
                    <div class="" style="margin-top:-2rem">

                        <input type="radio" class="btn-check" name="test-types" id="ACT" value="ACT" autocomplete="off">
                        <label class="btn grey-btn me-3" for="ACT">ACT</label>

                        <input type="radio" class="btn-check" name="test-types" id="SAT" value="SAT" autocomplete="off">
                        <label class="btn grey-btn me-3" for="SAT">SAT</label>

                        <input type="radio" class="btn-check" name="test-types" id="CLT" value="CLT" autocomplete="off">
                        <label class="btn grey-btn me-3" for="CLT">CLT</label>

                        <input type="radio" class="btn-check" name="test-types" id="NONE" value="NONE"
                            autocomplete="off">
                        <label class="btn grey-btn" for="NONE">NONE</label>
                    </div>
                </div>
                <div id="testtype-none-message" class="hide">
                    <p class="info-message">You could qualify for up to $2,500 in additional scholarships if you submit standardized test scores.
                    </p>
                </div>

                <!-- Test Score Range -->
                <div id="act-scores" class="hide">
                    <span class="fw-bold">My ACT is*</span>
                    <select class="form-select" aria-label="ACT Scores">
                        <option value="18-19">18-19</option>
                        <option value="20-21">20-21</option>
                        <option value="22-23">22-23</option>
                        <option value="24-26">24-26</option>
                        <option value="27-28">27-28</option>
                        <option value="29+">29+</option>
                    </select>
                </div>
                <div id="sat-scores" class="hide">
                    <span class="fw-bold">My SAT is*</span>
                    <select class="form-select" aria-label="SAT Scores">
                        <option value="960-1020">960-1020</option>
                        <option value="1030-1090">1030-1090</option>
                        <option value="1100-1150">1100-1150</option>
                        <option value="1160-1250">1160-1250</option>
                        <option value="1260-1320">1260-1320</option>
                        <option value="1330+">1330+</option>
                    </select>
                </div>
                <div id="clt-scores" class="hide">
                    <span class="fw-bold">My CLT is*</span>
                    <select class="form-select" aria-label="CTL Scores">
                        <option value="61-65">61-65</option>
                        <option value="66-71">66-71</option>
                        <option value="72-75">72-75</option>
                        <option value="76-83">76-83</option>
                        <option value="84-88">84-88</option>
                        <option value="89+">89+</option>
                    </select>
                </div>
                <!-- GPA Scores -->
                <div class="form-question" id="freshman-gpa-scores" style="margin-top:2rem;padding-bottom:2rem">
                    <span class="fw-bold">My GPA is*</span>
                    <select class="form-select" aria-label="GPA Scores">
                        <option value="Below 3.00">Below 3.00</option>
                        <option value="3.00-3.49">3.00-3.49</option>
                        <option value="3.50-3.74">3.50-3.74</option>
                        <option value="3.75-3.89">3.75-3.89</option>
                        <option value="3.90-3.99">3.90-3.99</option>
                        <option value="4.00">4.00</option>
                    </select>
                </div>
                <div class="form-question hide" id="transfer-gpa-scores" style="padding-bottom:2rem">
                    <span class="fw-bold">My GPA is*</span>
                    <select class="form-select" aria-label="GPA Scores">
                        <option value="2.00-2.49">2.00-2.49</option>
                        <option value="2.50-2.99">2.50-2.99</option>
                        <option value="3.00-3.49">3.00-3.49</option>
                        <option value="3.50-3.74">3.50-3.74</option>
                        <option value="3.75-4.00">3.75-4.00</option>
                    </select>
                </div>
                <div class="clearfix"></div>

                <div id="error-message" class="hide" style="width:fit-content;background-color:red;padding:.5rem;">
                    <p style="margin:0;">Please fix the highlighted issues</p>
                </div>

            </form>
        </div>
        <div class="col-sm-1"></div>
        <div class="col-sm-5">
            <!-- <div class="degree-container">
                <div class="degree-title"></div>
            </div> -->
            <div style="">
                <div class="icon-modal-container top" data-value="2">
                    <div class="icon-modal no-modal">
                        <div class="image"><img
                                src="https://www.mc.edu/Jake-Dev/application/files/3516/7346/8664/money.svg" alt="">
                        </div>
                        <div class="icon-info-container">
                            <div id="total" class="title">
                                <h3>$0</h3>
                            </div>
                            <div id="title" class="title">
                                <h4>TOTAL SCHOLARSHIPS ANNUALLY</h4>
                            </div>
                            <div class="">
                            </div> <!-- close  -->
                        </div> <!-- close icon-info-container -->
                    </div>
                </div>
            </div>
            <button style="" type="submit" class="btn btn-primary scholarship-btn">SHOW MY
                SCHOLARSHIP</button>
            <!-- Scholarship details -->
            <div id="scholarship-details-div" class="hide">
                <span><b>You qualify for:</b></span>
                <ul id="scholarship-details">
                    <!-- <li>$11,000 Deans Scholarship</li>
                    <li>$1,250 Visit Scholarship</li> -->
                </ul>
            </div>

            <div id="other-scholarship-div" class="border-top border-1 border-dark hide">
                <h3>OTHER SCHOLARSHIP OPPURTUNITIES</h3>
                <ul id="other-scholarship-opportunities">
                    <!-- <li>Based on your test scores, you are eligible for the <a target="_" href="https://www.google.com">Select Scholars Competition</a></li>
                    <li>Additional major-specific scholarships may be available as well. Contact your department for more information</li> -->
                </ul>
            </div>
        </div>
    </div>
</div>
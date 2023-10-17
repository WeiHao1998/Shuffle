import React, { useState, useEffect } from "react";
import ReactGA from "react-ga4";
import Checkbox from "@mui/material/Checkbox";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import ExtensionIcon from "@mui/icons-material/Extension";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import theme from "../theme.jsx";
import CheckBoxSharpIcon from "@mui/icons-material/CheckBoxSharp";
import AppSearch from "../components/Appsearch.jsx";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Collapse,
  IconButton,
  FormGroup,
  FormControl,
  InputLabel,
  FormLabel,
  FormControlLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Typography,
  TextField,
  Zoom,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tooltip,
  Chip,
  ButtonGroup,
} from "@mui/material";
//import { useAlert

import { useNavigate, Link } from "react-router-dom";
import WorkflowSearch from "../components/Workflowsearch.jsx";
import AuthenticationItem from "../components/AuthenticationItem.jsx";
import WorkflowPaper from "../components/WorkflowPaper.jsx";
import UsecaseSearch from "../components/UsecaseSearch.jsx";
import ExploreWorkflow from "../components/ExploreWorkflow.jsx";

const responsive = {
  0: { items: 1 },
};

const imagestyle = {
  height: 40,
  borderRadius: 40,
  //border: "2px solid rgba(255,255,255,0.3)",
};

const WelcomeForm = (props) => {
  const {
    userdata,
    globalUrl,
    discoveryWrapper,
    setDiscoveryWrapper,
    appFramework,
    getFramework,
    activeStep,
    setActiveStep,
    steps,
    skipped,
    setSkipped,
    getApps,
    apps,
    handleSetSearch,
    usecaseButtons,
    defaultSearch,
    setDefaultSearch,
    selectionOpen,
    setSelectionOpen,
  } = props;
  const [isActive, setIsActive] = useState(0);

  const [usecaseItems, setUsecaseItems] = useState([
    {
      search: "Phishing",
      usecase_search: undefined,
    },
    {
      search: "Enrichment",
      usecase_search: undefined,
    },
    {
      search: "Enrichment",
      usecase_search: "SIEM alert enrichment",
    },
    {
      search: "Build your own",
      usecase_search: undefined,
    },
  ]);
  /*
			<div style={{minWidth: "95%", maxWidth: "95%", marginLeft: 5, marginRight: 5, }}>
				<UsecaseSearch
					globalUrl={globalUrl}
					defaultSearch={"Phishing"}
					appFramework={appFramework}
					apps={apps}
					getFramework={getFramework}
					userdata={userdata}
				/>
			</div>
			,
			<div style={{minWidth: "95%", maxWidth: "95%", marginLeft: 5, marginRight: 5, }}>
				<UsecaseSearch
					globalUrl={globalUrl}
					defaultSearch={"Enrichment"}
					appFramework={appFramework}
					apps={apps}
					getFramework={getFramework}
					userdata={userdata}
				/>
			</div>
			,
			<div style={{minWidth: "95%", maxWidth: "95%", marginLeft: 5, marginRight: 5, }}>
				<UsecaseSearch
					globalUrl={globalUrl}
					defaultSearch={"Enrichment"}
					usecaseSearch={"SIEM alert enrichment"}
					appFramework={appFramework}
					apps={apps}
					getFramework={getFramework}
					userdata={userdata}
				/>
			</div>
			,
			<div style={{minWidth: "95%", maxWidth: "95%", marginLeft: 5, marginRight: 5, }}>
				<UsecaseSearch
					globalUrl={globalUrl}
					defaultSearch={"Build your own"}
					appFramework={appFramework}
					apps={apps}
					getFramework={getFramework}
					userdata={userdata}
				/>
			</div>
		])
		*/

    const [discoveryData, setDiscoveryData] = React.useState({})
    const [name, setName] = React.useState("")
    const [orgName, setOrgName] = React.useState("")
    const [role, setRole] = React.useState("")
    const [orgType, setOrgType] = React.useState("")
    const [finishedApps, setFinishedApps] = React.useState([])
  	const [authentication, setAuthentication] = React.useState([]);
	const [newSelectedApp, setNewSelectedApp] = React.useState({})
	const [thumbIndex, setThumbIndex] = useState(0);
    const [thumbAnimation, setThumbAnimation] = useState(false);
    const [clickdiff, setclickdiff] = useState(0);

	const isCloud = window.location.host === "localhost:3002" || window.location.host === "shuffler.io";
  
  	//const alert = useAlert();
		let navigate = useNavigate();

  const iconStyles = {
    color: "rgba(255, 255, 255, 1)",
  };

  const onNodeSelect = (label) => {
    if (setDiscoveryWrapper !== undefined) {
      setDiscoveryWrapper({ id: label });
    }

    if (isCloud) {
      ReactGA.event({
        category: "welcome",
        action: `click_${label}`,
        label: "",
      });
    }

    setSelectionOpen(true);
    setDefaultSearch(label);
  };

  useEffect(() => {
    if (userdata.id === undefined) {
      return;
    }

    if (
      userdata.name !== undefined &&
      userdata.name !== null &&
      userdata.name.length > 0
    ) {
      setName(userdata.name);
    }

    if (
      userdata.active_org !== undefined &&
      userdata.active_org.name !== undefined &&
      userdata.active_org.name !== null &&
      userdata.active_org.name.length > 0
    ) {
      setOrgName(userdata.active_org.name);
    }
  }, [userdata]);

  useEffect(() => {
    if (discoveryWrapper === undefined || discoveryWrapper.id === undefined) {
      setDefaultSearch("");
      var newfinishedApps = finishedApps;
      newfinishedApps.push(defaultSearch);
      setFinishedApps(finishedApps);
    }
  }, [discoveryWrapper]);

  useEffect(() => {
    if (
      window.location.search !== undefined &&
      window.location.search !== null
    ) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      const foundTab = params["tab"];
      if (foundTab !== null && foundTab !== undefined && !isNaN(foundTab)) {
        if (foundTab === 3 || foundTab === "3") {
          //console.log("Set search!")
        }
      } else {
        //navigate(`/welcome?tab=1`)
      }

      const foundTemplate = params["workflow_template"];
      if (foundTemplate !== null && foundTemplate !== undefined) {
        console.log("Found workflow template: ", foundTemplate);

        var sourceapp = undefined;
        var destinationapp = undefined;
        var action = undefined;
        const srcapp = params["source_app"];
        if (srcapp !== null && srcapp !== undefined) {
          sourceapp = srcapp;
        }

        const dstapp = params["dest_app"];
        if (dstapp !== null && dstapp !== undefined) {
          destinationapp = dstapp;
        }

        const act = params["action"];
        if (act !== null && act !== undefined) {
          action = act;
        }

        //defaultSearch={foundTemplate}
        //
        usecaseItems[0] = {
          search: "enrichment",
          usecase_search: foundTemplate,
          sourceapp: sourceapp,
          destinationapp: destinationapp,
          autotry: action === "try",
        };

        console.log("Adding: ", usecaseItems[0]);

        setUsecaseItems(usecaseItems);
      }
    }
  }, []);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const sendUserUpdate = (name, role, userId) => {
    const data = {
      tutorial: "welcome",
      firstname: name,
      company_role: role,
      user_id: userId,
    };

    const url = `${globalUrl}/api/v1/users/updateuser`;
    fetch(url, {
      mode: "cors",
      method: "PUT",
      body: JSON.stringify(data),
      credentials: "include",
      crossDomain: true,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) =>
        response.json().then((responseJson) => {
          if (responseJson["success"] === false) {
            console.log("Update user success");
            //toast("Failed updating org: ", responseJson.reason);
          } else {
            console.log("Update success!");
            //toast("Successfully edited org!");
          }
        })
      )
      .catch((error) => {
        console.log("Update err: ", error.toString());
        //toast("Err: " + error.toString());
      });
  };

  const sendOrgUpdate = (orgname, company_type, orgId, priority) => {
    var data = {
      org_id: orgId,
    };

    if (orgname.length > 0) {
      data.name = orgname;
    }

    if (company_type.length > 0) {
      data.company_type = company_type;
    }

    if (priority.length > 0) {
      data.priority = priority;
    }

    const url = globalUrl + `/api/v1/orgs/${orgId}`;
    fetch(url, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      crossDomain: true,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) =>
        response.json().then((responseJson) => {
          if (responseJson["success"] === false) {
            console.log("Update of org failed");
            //toast("Failed updating org: ", responseJson.reason);
          } else {
            //toast("Successfully edited org!");
          }
        })
      )
      .catch((error) => {
        console.log("Update err: ", error.toString());
        //toast("Err: " + error.toString());
      });
  };

  var workflowDelay = -50;
  const NewHits = ({ hits }) => {
    const [mouseHoverIndex, setMouseHoverIndex] = useState(-1);
    var counted = 0;

    const paperAppContainer = {
      display: "flex",
      flexWrap: "wrap",
      alignContent: "space-between",
      marginTop: 5,
    };

    return (
      <Grid container spacing={4} style={paperAppContainer}>
        {hits.map((data, index) => {
          workflowDelay += 50;

          if (index > 3) {
            return null;
          }

          return (
            <Zoom
              key={index}
              in={true}
              style={{ transitionDelay: `${workflowDelay}ms` }}
            >
              <Grid item xs={6} style={{ padding: "12px 10px 12px 10px" }}>
                <WorkflowPaper key={index} data={data} />
              </Grid>
            </Zoom>
          );
        })}
      </Grid>
    );
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    setDefaultSearch("");

    if (activeStep === 0) {
      console.log("Should send basic information about org (fetch)");
      setclickdiff(240);
      navigate(`/welcome?tab=2`);

      if (isCloud) {
        ReactGA.event({
          category: "welcome",
          action: "click_page_one_next",
          label: "",
        });
      }

      if (
        userdata.active_org !== undefined &&
        userdata.active_org.id !== undefined &&
        userdata.active_org.id !== null &&
        userdata.active_org.id.length > 0
      ) {
        sendOrgUpdate(orgName, orgType, userdata.active_org.id, "");
      }

      if (
        userdata.id !== undefined &&
        userdata.id !== null &&
        userdata.id.length > 0
      ) {
        sendUserUpdate(name, role, userdata.id);
      }
    } else if (activeStep === 1) {
      console.log("Should send secondary info about apps and other things");
      setDiscoveryWrapper({});

      navigate(`/welcome?tab=3`);
      //handleSetSearch("Enrichment", "2. Enrich")
      handleSetSearch(usecaseButtons[0].name, usecaseButtons[0].usecase);
      getApps();

      // Make sure it's up to date
      if (getFramework !== undefined) {
        getFramework();
      }
    } else if (activeStep === 2) {
      console.log(
        "Should send third page with workflows activated and the like"
      );
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

    if (activeStep === 2) {
      setDiscoveryWrapper({});

      if (getFramework !== undefined) {
        getFramework();
      }
      navigate("/welcome?tab=2");
    } else if (activeStep === 1) {
      navigate("/welcome?tab=1");
    }
  };

  const handleSkip = () => {
    setclickdiff(240);
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    console.log("Selected app changed (effect)");
  }, [newSelectedApp]);

  //const buttonWidth = 145
  const buttonWidth = 450;
  const buttonMargin = 10;
  const sizing = 475;
  const bottomButtonStyle = {
    borderRadius: 200,
    height: 51,
    width: 464,
    fontSize: 16,
    // background: "linear-gradient(89.83deg, #FF8444 0.13%, #F2643B 99.84%)",
    background: "linear-gradient(90deg, #F86744 0%, #F34475 100%)",
    padding: "16px 24px",
    // top: 20,
    margin: "auto",
    itemAlign: "center",
    // marginLeft: "65px",
  };

  const buttonStyle = {
    flex: 1,
    width: 224,
    padding: 25,
    margin: buttonMargin,
	color : "var(--White-text, #F1F1F1)",
	fontWeight: 400,
    fontSize: 16,
    background: "rgba(33, 33, 33, 1)",
    borderColor: "rgba(33, 33, 33, 1)",
    borderRadius: 8,
  };

  const slideNext = () => {
    if (!thumbAnimation && thumbIndex < usecaseItems.length - 1) {
      //handleSetSearch(usecaseButtons[0].name, usecaseButtons[0].usecase)
      setThumbIndex(thumbIndex + 1);
    } else if (!thumbAnimation && thumbIndex === usecaseItems.length - 1) {
      setThumbIndex(0);
    }
  };

  const slidePrev = () => {
    if (!thumbAnimation && thumbIndex > 0) {
      setThumbIndex(thumbIndex - 1);
    } else if (!thumbAnimation && thumbIndex === 0) {
      setThumbIndex(usecaseItems.length - 1);
    }
  };

  const newButtonStyle = {
    padding: 22,
    flex: 1,
    margin: buttonMargin,
    minWidth: buttonWidth,
    maxWidth: buttonWidth,
  };

  const formattedCarousel =
    appFramework === undefined || appFramework === null
      ? []
      : usecaseItems.map((item, index) => {
          return (
            <div
              style={{
                minWidth: "95%",
                maxWidth: "95%",
                marginLeft: 5,
                marginRight: 5,
              }}
            >
              <UsecaseSearch
                globalUrl={globalUrl}
                defaultSearch={item.search}
                usecaseSearch={item.usecase_search}
                appFramework={appFramework}
                apps={apps}
                getFramework={getFramework}
                userdata={userdata}
                autotry={item.autotry}
                sourceapp={item.sourceapp}
                destinationapp={item.destinationapp}
              />
            </div>
          );
        });

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Collapse in={true}>
            <Grid
              container
              spacing={1}
              style={{
                margin: "auto",
                maxWidth: 500,
                minWidth: 500,
                minHeight: sizing,
                maxHeight: sizing,
              }}
            >
              {/*isCloud ? null :
												<Typography variant="body1" style={{marginLeft: 8, marginTop: 10, marginRight: 30, }} color="textSecondary">
														This data will be used within the product and NOT be shared unless <a href="https://shuffler.io/docs/organizations#cloud_synchronization" target="_blank" rel="norefferer" style={{color: "#f86a3e", textDecoration: "none"}}>cloud synchronization</a> is configured.
													</Typography>
											*/}
              <Typography
                variant="body1"
                style={{ marginLeft: 8, marginTop: 10, marginRight: 30 }}
                color="textSecondary"
              >
                In order to understand how we best can help you find relevant
                Usecases, please provide the information below. This is
                optional, but highly encouraged.
              </Typography>
              <Grid item xs={11} style={{ marginTop: 16, padding: 0 }}>
                <TextField
                  required
                  style={{ width: "100%", marginTop: 0 }}
                  placeholder="Name"
                  autoFocus
                  label="Name"
                  type="name"
                  id="standard-required"
                  autoComplete="name"
                  margin="normal"
                  variant="outlined"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={11} style={{ marginTop: 10, padding: 0 }}>
                <TextField
                  required
                  style={{ width: "100%", marginTop: 0 }}
                  placeholder="Company / Institution"
                  label="Company Name"
                  type="companyname"
                  id="standard-required"
                  autoComplete="CompanyName"
                  margin="normal"
                  variant="outlined"
                  value={orgName}
                  onChange={(e) => {
                    setOrgName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={11} style={{ marginTop: 10 }}>
                <FormControl fullWidth={true}>
                  <InputLabel style={{ marginLeft: 10, color: "#B9B9BA" }}>
                    Your Role
                  </InputLabel>
                  <Select
                    variant="outlined"
                    required
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  >
                    <MenuItem value={"Student"}>Student</MenuItem>
                    <MenuItem value={"Security Analyst/Engineer"}>
                      Security Analyst/Engineer
                    </MenuItem>
                    <MenuItem value={"SOC Manager"}>SOC Manager</MenuItem>
                    <MenuItem value={"C-Level"}>C-Level</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={11} style={{ marginTop: 16 }}>
                <FormControl fullWidth={true}>
                  <InputLabel style={{ marginLeft: 10, color: "#B9B9BA" }}>
                    Company Type
                  </InputLabel>
                  <Select
                    required
                    variant="outlined"
                    onChange={(e) => {
                      setOrgType(e.target.value);
                    }}
                  >
                    <MenuItem value={"Education"}>Education</MenuItem>
                    <MenuItem value={"MSSP"}>MSSP</MenuItem>
                    <MenuItem value={"Security Product Company"}>
                      Security Product Company
                    </MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Collapse>
        );
      case 1:
        return (
          <Collapse in={true}>
            <div
              style={{
                minHeight: sizing,
                maxHeight: sizing,
                marginTop: 20,
                width: 500,
              }}
            >
				{selectionOpen ? (
                  <div
                    style={{
                      width: 319,
                      height: 395,
                      flexShrink: 0,
					  marginLeft:70,
					  marginTop: 68,
					  position:"absolute",
					  zIndex:100,
                      borderRadius: 6,
                      border: "1px solid var(--Container-Stroke, #494949)",
                      background: "var(--Container, #212121)",
                      boxShadow: "8px 8px 32px 24px rgba(0, 0, 0, 0.16)",
                    }}
                  >
                    <div style={{display: "flex", textAlign:"center"}}>
                      <Typography style={{padding:16}}> {defaultSearch} </Typography>
					  <Button
					  style={{
						flex: 1,
						width: 224,
						paddingLeft: 172,
						fontSize: 16,
						background: "rgba(33, 33, 33, 1)",
						borderColor: "rgba(33, 33, 33, 1)",
						borderRadius: 8,
					  }}
					  onClick={() => {
						setSelectionOpen(false)
					  }}
					  >
					  <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                      >
                        <path
                          d="M1 1L10.5 10.5"
                          stroke="#9E9E9E"
                          stroke-linecap="round"
                        />
                        <path
                          d="M10.5 1L1 10.5"
                          stroke="#9E9E9E"
                          stroke-linecap="round"
                        />
                      </svg>
					  </Button>
                    </div>
                    <div
                      style={{ width: "100%", border: "1px #494949 solid" }}
                    />
                    <AppSearch
                      defaultSearch={defaultSearch}
                      newSelectedApp={newSelectedApp}
                      setNewSelectedApp={setNewSelectedApp}
                      userdata={userdata}
                      // cy={cy}
                    />
                  </div>
                ) : null}
              {/* <Typography variant="body1" style={{marginLeft: 8, marginTop: 50, marginRight: 30, marginBottom: 0, }} color="textSecondary">
													Apps for each category are shown based on your activity and can be changed by clicking their icon. We will help you connect them later.
												</Typography> */}
              {/* <div style={{display:"flex"}}>
													<ArrowBackIosNewIcon style={{color: "#9E9E9E", width: "16px",}} onClick={() => {
														navigate("/welcome")
													}}/>
													<Typography variant="h8" style={{color: "#9E9E9E",textAlign: "center", marginLeft: 5}} onClick={() => {
														navigate("/welcome")
													}}>
													Back
													</Typography>
												</div> */}
              <Typography
                variant="h4"
                style={{
                  marginLeft: 8,
                  marginTop: 40,
                  marginRight: 30,
                  marginBottom: 0,
                }}
                color="rgba(241, 241, 241, 1)"
              >
                Find your apps
              </Typography>
              <Typography
                variant="body2"
                style={{
                  marginLeft: 8,
                  marginTop: 10,
                  marginRight: 30,
                  marginBottom: 40,
                }}
                color="rgba(158, 158, 158, 1)"
              >
                Select the apps you work with and we will connect the for you.
              </Typography>
              {/*The app framework helps us access and authenticate the most important APIs for you. */}

              {/*
                        <Grid item xs={10}>
                            <FormControl fullWidth={true}>
                                <InputLabel style={{ color: "#B9B9BA" }}>What is your development experience?</InputLabel>
                                <Select
                                    required
                                >
                                    <MenuItem value={10}>Beginner</MenuItem>
                                    <MenuItem value={20}>Intermediate</MenuItem>
                                    <MenuItem value={30}>Automation Ninja</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
												*/}
              <Grid item xs={11} style={{}}>
                {/*<FormLabel style={{ color: "#B9B9BA" }}>Find your integrations!</FormLabel>*/}
                <div style={{ display: "flex", width: 464 }}>
                  <Button
                    disabled={finishedApps.includes("CASES")}
                    variant={
                      defaultSearch === "CASES" ? "contained" : "outlined"
                    }
                    color="secondary"
                    style={{
                      flex: 1,
                      width: "100%",
                      padding: 25,
                      margin: buttonMargin,
                      fontSize: 16,
					  color : "var(--White-text, #F1F1F1)",
					  fontWeight: 400,
                      background: "rgba(33, 33, 33, 1)",
                      borderColor: finishedApps.includes("CASES")
                        ? "inherit"
                        : "rgba(33, 33, 33, 1)",
                      borderRadius: 8,
                    }}
                    startIcon = {<LightbulbIcon/>}
                    onClick={(event) => {
                      onNodeSelect("CASES");
                    }}
                  >
                    Case Management
                  </Button>
                </div>
                <div style={{ display: "flex", width: 464 }}>
                  <Button
                    disabled={finishedApps.includes("SIEM")}
                    variant={
                      defaultSearch === "SIEM" ? "contained" : "outlined"
                    }
                    style={buttonStyle}
                    startIcon={<SearchIcon />}
                    color="secondary"
                    onClick={(event) => {
                      onNodeSelect("SIEM");
                    }}
                  >
                    SIEM
                  </Button>
                  <Button
                    disabled={
                      finishedApps.includes("EDR & AV") ||
                      finishedApps.includes("ERADICATION")
                    }
                    variant={
                      defaultSearch === "Eradication" ? "contained" : "outlined"
                    }
                    style={buttonStyle}
                    startIcon={<NewReleasesIcon />}
                    color="secondary"
                    onClick={(event) => {
                      onNodeSelect("ERADICATION");
                    }}
                  >
                    Endpoint
                  </Button>
                </div>
                <div style={{ display: "flex", width: 464 }}>
                  <Button
                    disabled={finishedApps.includes("INTEL")}
                    variant={
                      defaultSearch === "INTEL" ? "contained" : "outlined"
                    }
                    style={buttonStyle}
                    startIcon={<ExtensionIcon />}
                    color="secondary"
                    onClick={(event) => {
                      onNodeSelect("INTEL");
                    }}
                  >
                    Intel
                  </Button>
                  <Button
                    disabled={
                      finishedApps.includes("COMMS") ||
                      finishedApps.includes("EMAIL")
                    }
                    variant={
                      defaultSearch === "EMAIL" ? "contained" : "outlined"
                    }
                    style={buttonStyle}
                    startIcon={<EmailIcon />}
                    color="secondary"
                    onClick={(event) => {
                      onNodeSelect("EMAIL");
                    }}
                  >
                    Email
                  </Button>
                </div>
                {/* <FormControl>
                                <FormLabel style={{ color: "#B9B9BA" }}>What do you want to automate first ?</FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        value="Email"
                                        control={<Checkbox style={{ color: "#F85A3E" }} onChange={(event) => { onNodeSelect("Email") }} />}
                                        label="Email"
                                        labelPlacement="Email"
                                    />
                                    <FormControlLabel
                                        value="SIEM"
                                        control={<Checkbox style={{ color: "#F85A3E" }} onChange={(event) => { onNodeSelect("SIEM") }} />}
                                        label="SIEM"
                                        labelPlacement="SIEM"
                                    />
                                    <FormControlLabel
                                        value="EDR"
                                        control={<Checkbox style={{ color: "#F85A3E" }} onChange={(event) => { onNodeSelect("EDR") }} />}
                                        label="EDR"
                                        labelPlacement="EDR"
                                    />
                                </FormGroup>
                            </FormControl> */}
                        </Grid>
							</div>
							<div style={{ flexDirection: "row", }}>
					<Button variant="contained" type="submit" fullWidth style={bottomButtonStyle} onClick={() => {
						navigate("/welcome?tab=3")
        				setActiveStep(2)
					}}>
						Continue
					</Button>
				</div>
			</Collapse>
					
                )
            case 2:
                return (
									<Collapse in={true}>
                    <div style={{marginTop: 0, maxWidth: 700, minWidth: 700, margin: "auto", minHeight: sizing, maxHeight: sizing, }}>

												<div style={{marginTop: 0, }}>
		  										<div className="thumbs" style={{display: "flex"}}>
														<div style={{minWidth: 554, maxWidth: 554, borderRadius: theme.palette.borderRadius, }}>
															<ExploreWorkflow
																globalUrl={globalUrl}
																userdata={userdata}
															/>
														</div>
       											</div> 
											</div>
										</div>
									</Collapse>
                )
            default:
                return "unknown step"
        }
    }


  const extraHeight = isCloud ? -7 : 0;
  return (
    <div style={{}}>
      {/*selectionOpen ?
							<WorkflowSearch
									defaultSearch={defaultSearch}
									newSelectedApp={newSelectedApp}
									setNewSelectedApp={setNewSelectedApp}
							/>
            : null*/}
      <div>
        {activeStep === steps.length ? (
          <div paddingTop="20px">
            You Will be Redirected to getting Start Page Wait for 5-sec.
            <Button onClick={handleReset}>Reset</Button>
            <script>
              setTimeout(function() {navigate("/workflows")}, 5000);
            </script>
            <Button>
              <Link
                style={{ color: "#f86a3e" }}
                to="/workflows"
                className="btn btn-primary"
              >
                Getting Started
              </Link>
            </Button>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            {/* 	<div style={{marginBottom: 20, }}/>
													{activeStep === 2 || activeStep === 1 ? 
														<div style={{margin: "auto", minWidth: 500, maxWidth: 500, position: "relative", }}>
															<Button 
																disabled={activeStep === 0} 
																onClick={handleBack}
																variant={"outlined"}
																style={{marginLeft: 10, height: 64, width: 100, position: "absolute", top: activeStep === 1 ? -625-extraHeight : -576, left: activeStep === 1 ? 125 : -125+clickdiff, borderRadius: "50px 0px 0px 50px", }} 
															>
																	Back
															</Button>
															<Button 
																variant={"outlined"}
																color="primary" 
																onClick={handleNext} 
																style={{marginLeft: 10, height: 64, width: 100, position: "absolute", top: activeStep === 1 ? -625-extraHeight : -576, left: activeStep === 1 ? 738 : 489+clickdiff, borderRadius: "0px 50px 50px 0px", }}
																disabled={activeStep === 0 ? orgName.length === 0 || name.length === 0 : false}
															>
																	{activeStep === steps.length - 1 ? "Finish" : "Next"}
															</Button>
														</div>
														: 
														<div style={{margin: "auto", minWidth: 500, maxWidth: 500, marginLeft: activeStep === 1 ? 250 : "auto", marginTop: activeStep === 0 ? 25 : 0, }}>
															<Button disabled={activeStep === 0} onClick={handleBack}>
																	Back
															</Button>
															// (commented) isStepOptional(activeStep) && (
																	<Button
																			variant="contained"
																			color="primary"
																			onClick={handleSkip}
																	>
																			Skip
																	</Button>
															) //commented
															<Button 
																variant={activeStep === 1 ? finishedApps.length >= 4 ? "contained" : "outlined" : "outlined"}
																color="primary" 
																onClick={handleNext} 
																style={{marginLeft: 10, }} 
																disabled={activeStep === 0 ? orgName.length === 0 || name.length === 0 : false}
															>
																	{activeStep === steps.length - 1 ? "Finish" : "Next"}
															</Button>
															{activeStep === 0 ? 
																<Button 
																	variant={"outlined"}
																	color="secondary" 
																	onClick={() => {
																		console.log("Skip!")
    		
																		setclickdiff(240)
																		if (isCloud) {
																				ReactGA.event({
																					category: "welcome",
																					action: "click_page_one_skip",
																					label: "",
																				})
																		}

																		setActiveStep(1)
																		navigate(`/welcome?tab=2`)
																	}} 
																	style={{marginLeft: 240, }} 
																	disabled={activeStep !== 0}
																>
																	Skip
																</Button>
															: null}
                    			</div>
												}*/}
          </div>
		)}
      </div>
    </div>
  );
};

export default WelcomeForm;

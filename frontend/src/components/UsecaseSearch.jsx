import React, { useState, useEffect } from "react";
import theme from '../theme';
import { useAlert } from "react-alert";
import ConfigureWorkflow from "../components/ConfigureWorkflow.jsx";
import PaperComponent from "../components/PaperComponent.jsx"
import AuthenticationOauth2 from "../components/Oauth2Auth.jsx";
import AuthenticationNormal from "../components/AuthenticationNormal.jsx";
import AppsearchPopout from "../components/AppsearchPopout.jsx";

import {
	ExpandLess as ExpandLessIcon,
	ExpandMore as ExpandMoreIcon,
	AddCircleOutline as AddCircleOutlineIcon,
  Delete as DeleteIcon,
  Description as DescriptionIcon,
	Close as CloseIcon,
} from '@mui/icons-material';

import {
		Dialog,
		IconButton,
		Typography, 
		Button,
		CircularProgress, 
		Tooltip,
		Divider,
} from "@material-ui/core";

const defaultValue = {"id": "", "name": "", 
		"source": {"text": "No trigger selected", "error": ""}, 
		"destination": {"text": "No subflow selected", "error": ""}, 
		"middle": []
}

export const usecaseTypes = [{
	"name": "enrichment",
	"value": [{
		"name": "EDR Ticket Enrichment",
		"usecase_references": ["EDR to ticket"],
		"active": true,
		"items": [{
			"name": "When an EDR alert is found",
			"app_type": "edr",
			"type": "trigger",
		}, {	
			"name": "Create a ticket",
			"app_type": "cases",
			"type": "subflow",
		}],
	},
	{
		"name": "SIEM alert Enrichment",
		"usecase_references": ["SIEM to ticket"],
		"active": true,
		"items": [{
			"name": "When a SIEM alert is found",
			"app_type": "siem",
			"type": "trigger",
		},
		{
			"name": "Create a ticket",
			"app_type": "cases",
			"type": "subflow",
		}],
	},
	{
		"name": "Email Enrichment",
		"usecase_references": ["Email management"],
		"active": true,
		"items": [{
			"name": "When I get an email",
			"app_type": "email",
			"type": "trigger",
		},
		{
			"name": "Create a ticket",
			"app_type": "cases",
			"type": "subflow",
		}],
	}]
},
{
	"name": "phishing",
	"value": [
		{
			"name": "Email analysis",
			"usecase_references": ["Email management"],
			"active": true,
			"items": [{
				"name": "When I get an email",
				"app_type": "email",
				"type": "trigger",
			},{
				"name": "Create a ticket",
				"app_type": "cases",
				"type": "subflow",
			}],
		}]
	},
	{
	"name": "detection",
	"value": [
		{
			"name": "Sigma rule detection",
			"active": false,
			"items": [{
				"name": "When a sigma rule triggers",
				"app_type": "siem",
				"type": "trigger",
			},
			{
				"name": "Create a ticket",
				"app_type": "cases",
				"type": "subflow",
			}],
		}]
	},
	{
	"name": "response",
	"value": [
		{
			"name": "EDR host isolation",
			"active": false,
			"items": [{
				"name": "When malicious endpoint activity is detected",
				"app_type": "edr",
				"type": "trigger",
			},
			{
				"name": "Isolate the host",
				"app_type": "edr",
				"type": "subflow",
			}],
		}]
	}
]

export const triggerlist = [
	{
		"app_id": "",
		"app_name": "",
		"app_version": "",
		"text": "No trigger selected",
		"image": "",
		"type": "",
		"action_type": "",
		"error": "",
	},
	{
		"app_id": "",
		"app_name": "",
		"app_version": "",
		"text": "When I get an email",
		"image": "",
		"type": "email",
		"action_type": "receive",
	},
	{
		"app_id": "",
		"app_name": "",
		"app_version": "",
		"text": "When a ticket is created",
		"image": "",
		"type": "cases",
		"action_type": "case_opened",
	},
	{
		"app_id": "",
		"app_name": "",
		"app_version": "",
		"text": "When an EDR alert is found",
		"image": "",
		"type": "edr",
		"action_type": "case_opened",
	},
	{
		"app_id": "",
		"app_name": "",
		"app_version": "",
		"text": "When a SIEM alert is found",
		"image": "",
		"type": "siem",
		"action_type": "case_opened",
	},
	{
		"app_id": "",
		"app_name": "",
		"app_version": "",
		"text": "When a sigma rule triggers",
		"image": "",
		"type": "siem",
		"action_type": "case_opened",
		"disabled": true,
	},
	{
		"app_id": "",
		"app_name": "",
		"app_version": "",
		"text": "When malicious endpoint activity is detected",
		"image": "",
		"type": "edr",
		"action_type": "case_opened",
		"disabled": true,
	}
]

export const midflows = [
	{
		"app_id": "",
		"app_name": "",
		"app_version": "",
		"text": "Enrich",
		"image": "",
		"type": "intel",
		"action_type": "enrich",
	},
	{

		"app_id": "",
		"app_name": "",
		"app_version": "",
		"text": "Analyze",
		"image": "",
		"type": "intel",
		"action_type": "analyze",
		"disabled": true,
	}
]

export const subflows = [
	{
		"app_id": "",
		"app_name": "",
		"app_version": "",
		"text": "No subflow selected",
		"image": "",
		"type": "",
		"action_type": "",
		"error": "",
	},
	{
		"app_id": "",
		"app_name": "",
		"app_version": "",
		"text": "Create a ticket",
		"image": "",
		"type": "cases",
		"action_type": "case_create",
	},
	{
		"app_id": "",
		"app_name": "",
		"app_version": "",
		"text": "Update a ticket",
		"image": "",
		"type": "cases",
		"action_type": "case_update",
		"disabled": true,
		//"source_type": "case_opened",
	},
	{
		"app_id": "",
		"app_name": "",
		"app_version": "",
		"text": "Answer the sender",
		"image": "",
		"type": "email",
		"action_type": "send",
		"disabled": true,
		//"source_type": "case_opened",
	},
	{
		"app_id": "",
		"app_name": "",
		"app_version": "",
		"text": "Isolate the host",
		"image": "",
		"type": "edr",
		"action_type": "respond",
		"disabled": true,
		//"source_type": "case_opened",
	},
]

const UsecaseSearch = (props) => {
	const { defaultSearch, appFramework, globalUrl, showTitle, canExpand, apps, setFoundWorkflowId, getFramework, userdata, usecaseSearch, setUsecaseSearch, autotry, setCloseWindow, } = props

		
  const [allusecases, setAllUsecases] = React.useState([
		JSON.parse(JSON.stringify(defaultValue))
	])
	const [searchType, setSearchType] = React.useState("")
	const [usecaseIndex, setUsecaseIndex] = React.useState(0)
  const [_, setUpdate] = useState(""); // Used for rendring, don't remove
	const [isUploading, setIsUploading] = React.useState(false)
	const [configureWorkflowModalOpen, setConfigureWorkflowModalOpen] = React.useState(false);
	const [configureWorkflowAuth, setConfigureWorkflowAuth] = React.useState([]);
  const [workflow, setWorkflow] = React.useState({});
  const [appAuthentication, setAppAuthentication] = React.useState([]);
  const [authenticationType, setAuthenticationType] = React.useState("");
  const [authenticationModalOpen, setAuthenticationModalOpen] = React.useState(false);
  const [selectedApp, setSelectedApp] = React.useState({});
  const [selectedAction, setSelectedAction] = React.useState({});
  const [firstRequest, setFirstRequest] = React.useState(true);

  const isCloud = window.location.host === "localhost:3002" || window.location.host === "shuffler.io";
  const alert = useAlert()

	useEffect(() => {
		// if (firstRequest !== true && workflow.id !== undefined && autotry === true && setUsecaseSearch !== undefined && authenticationModalOpen === false && configureWorkflowModalOpen === false) {
		//
		if (autotry === true && configureWorkflowModalOpen === false && workflow.id !== undefined && setUsecaseSearch !== undefined) {
			console.log("Close it?")
			alert.info("Workflow successfully added! Add more apps, and we will suggest more workflows")

			if (setCloseWindow !== undefined) {
				setCloseWindow(true)
			}
			setUsecaseSearch("")
		}
	}, [configureWorkflowModalOpen])

	const rerunWorkflowCheck = (defaultSearch, usecaseSearch) => {
		const foundusecase = usecaseTypes.find(data => data.name.toLowerCase() === defaultSearch.toLowerCase())

		//console.log("FOUND: ", usecaseTypes, defaultSearch.toLowerCase(), foundusecase)
	
		if (foundusecase  !== undefined && foundusecase !== null) {
			// Just choose the first one.
			if (foundusecase.value !== undefined && foundusecase.value !== null && foundusecase.value.length > 0) {
				var selectedusecase = foundusecase.value[0]
				if (usecaseSearch !== undefined && usecaseSearch !== null) {
					const foundSubcase = foundusecase.value.find(usecase => usecase.name.toLowerCase() === usecaseSearch.toLowerCase())
					if (foundSubcase !== undefined && foundSubcase !== null) {
						selectedusecase = foundSubcase
					}
				}

				var newitem = JSON.parse(JSON.stringify(defaultValue))

				for (var key in selectedusecase.items) {
					// Check in different types
					const itemname = selectedusecase.items[key].name.toLowerCase()
					const trigger = triggerlist.find(data => data.text.toLowerCase() === itemname)
					if (trigger !== undefined && trigger !== null) {
						newitem.name = selectedusecase.name
						newitem.source = trigger

						continue
					}

					const midflow = midflows.find(data => data.text.toLowerCase() === itemname)
					if (midflow !== undefined && midflow !== null) {
						newitem.name = selectedusecase.name
						newitem.middle.push(midflow)

						continue
					}

					const subflow = subflows.find(data => data.text.toLowerCase() === itemname)
					if (subflow !== undefined && subflow !== null) {
						newitem.name = selectedusecase.name 
						newitem.destination = subflow 

						continue
					}
				}

				setAllUsecases([newitem])
				setUpdate(Math.random())
			}
		} else {
			console.log("NOT FOUND FOR: ", defaultSearch)
			setAllUsecases([JSON.parse(JSON.stringify(defaultValue))])
			setUpdate(Math.random())
		}
	}

 	if (defaultSearch !== undefined && defaultSearch !== null && defaultSearch !== searchType) {
		console.log("Setting searchtype to", defaultSearch)


		setSearchType(defaultSearch)
		setUsecaseIndex(0)
		rerunWorkflowCheck(defaultSearch, usecaseSearch)
	} 

	//if (defaultSearch !== undefined && defaultSearch.length > 0 && allusecases[usecaseIndex].name === "") {
	//	rerunWorkflowCheck()
	//}

	/*
		defaultSearch === "Enrichment" ?
			[{
				"id": "",
				"source": {
					"app_id": "",
					"app_name": "",
					"app_version": "",
					"text": "When I get an email",
					"image": "",
					"type": "email",
					"action_type": "receive",
				},
				"middle": [{
					"app_id": "",
					"app_name": "",
					"app_version": "",
					"text": "Enrich the data",
					"image": "",
					"type": "intel",
					"action_type": "case_create",
				}],
				"destination": {
					"app_id": "",
					"app_name": "",
					"app_version": "",
					"text": "Create a ticket",
					"image": "",
					"type": "cases",
					"action_type": "case_create",
				},
			}]
		: []
	)
	*/

	/*
	if (defaultSearch === undefined || defaultSearch === null || defaultSearch.length === 0) {
		return (
			<div style={{marginTop: 130, }}> 
				<Typography variant="h4">
					Choose a Usecase 
				</Typography>
			</div> 
		)
	}
	*/

	// Image = the source EMAIL system used
	var usecases = JSON.parse(JSON.stringify(allusecases))

	const imagestyle = {
		height: 50,
		width: 50,
		borderRadius: 25, 
		border: "1px solid rgba(255,255,255,0.3)",
		cursor: "pointer",
	}

	const getType = (inputtype) => {
		if (inputtype === undefined) {
			return inputtype

		}

		if (inputtype.toLowerCase() === "email" || inputtype.toLowerCase() === "comms") {
			inputtype = "communication"
		}

		return inputtype
	}

	// FIXME: Add a way for it to automatically discover
	// relevant workflows from the app at this point
	// or maybe it should be added directly to the app frameworks'
	// data

  const getAppAuthentication = (updateAction) => {
    fetch(globalUrl + "/api/v1/apps/authentication", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
		.then((response) => {
			if (response.status !== 200) {
				console.log("Status not 200 for app auth :O!");
			}

			return response.json();
		})
		.then((responseJson) => {
			if (responseJson.success) {
				setAppAuthentication(responseJson.data);
			}
		})
		.catch((error) => {
			console.log("App auth loading error: "+error.toString());
		})
	}

  //saveWorkflow={undefined} {/*saveWorkflow*/}
  //setNewAppAuth={undefined} {/*setNewAppAuth*/}
	const authenticationModal = authenticationModalOpen ? (
    <Dialog
      PaperComponent={PaperComponent}
			aria-labelledby="draggable-dialog-title"
      hideBackdrop={true}
      disableEnforceFocus={true}
			disableBackdropClick={true}
      style={{ pointerEvents: "none" }}
      open={authenticationModalOpen}
      onClose={() => {
        //if (configureWorkflowModalOpen) {
        //  setSelectedAction({});
        //}
      }}
      PaperProps={{
        style: {
					pointerEvents: "auto",
          backgroundColor: theme.palette.surfaceColor,
          color: "white",
          minWidth: 1100,
          minHeight: 700,
          maxHeight: 700,
          padding: 15,
          overflow: "hidden",
          zIndex: 10012,
					border: theme.palette.defaultBorder,
        },
      }}
    >
      <div
        style={{
          zIndex: 5000,
          position: "absolute",
          top: 20,
          right: 54,
          height: 50,
          width: 50,
					minHeight: 400,
					maxHeight: 670,
        }}
      >
        {selectedApp.reference_info === undefined ||
        selectedApp.reference_info === null ||
        selectedApp.reference_info.github_url === undefined ||
        selectedApp.reference_info.github_url === null ||
        selectedApp.reference_info.github_url.length === 0 ? (
          <a
            href={"https://github.com/shuffle/python-apps"}
            rel="noopener noreferrer" target="_blank" style={{ textDecoration: "none", color: "#f86a3e" }}
          >
            <img
              alt={`Documentation image for ${selectedApp.name}`}
              src={selectedApp.large_image}
              style={{
                width: 30,
                height: 30,
                border: "2px solid rgba(255,255,255,0.6)",
                borderRadius: theme.palette.borderRadius,
                maxHeight: 30,
                maxWidth: 30,
                overflow: "hidden",
                fontSize: 8,
              }}
            />
          </a>
        ) : (
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={selectedApp.reference_info.github_url}
            style={{ textDecoration: "none", color: "#f86a3e" }}
          >
            <img
              alt={`Documentation image for ${selectedApp.name}`}
              src={selectedApp.large_image}
              style={{
                width: 30,
                height: 30,
                border: "2px solid rgba(255,255,255,0.6)",
                borderRadius: theme.palette.borderRadius,
                maxWidth: 30,
                maxHeight: 30,
                overflow: "hidden",
                fontSize: 8,
              }}
            />
          </a>
        )}
      </div>
      <IconButton
        style={{
          zIndex: 5000,
          position: "absolute",
          top: 14,
          right: 18,
          color: "grey",
        }}
        onClick={() => {
          setAuthenticationModalOpen(false);
          if (configureWorkflowModalOpen) {
            setSelectedAction({});
          }
        }}
      >
        <CloseIcon />
      </IconButton>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            flex: 2,
            padding: 0,
            minHeight: 650,
            maxHeight: 650,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {authenticationType.type === "oauth2" ? (
            <AuthenticationOauth2
              saveWorkflow={undefined} 
              setNewAppAuth={undefined} 
              selectedApp={selectedApp}
              workflow={workflow}
              selectedAction={selectedAction}
              authenticationType={authenticationType}
              getAppAuthentication={getAppAuthentication}
              appAuthentication={appAuthentication}
              setSelectedAction={setSelectedAction}
              setAuthenticationModalOpen={setAuthenticationModalOpen}
							isCloud={isCloud}
							autoAuth={true}
            />
          ) : (
            <AuthenticationNormal 
              saveWorkflow={undefined} 
              setNewAppAuth={undefined} 
              selectedApp={selectedApp}
              workflow={workflow}
              selectedAction={selectedAction}
              authenticationType={authenticationType}
              getAppAuthentication={getAppAuthentication}
              appAuthentication={appAuthentication}
              setSelectedAction={setSelectedAction}
              setAuthenticationModalOpen={setAuthenticationModalOpen}
							isCloud={isCloud}
							app={selectedApp} 
							globalUrl={globalUrl}
						/>
          )}
        </div>
        <div
          style={{
            flex: 3,
            borderLeft: `1px solid ${theme.palette.inputColor}`,
            padding: "70px 30px 30px 30px",
            maxHeight: 630,
            minHeight: 630,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {selectedApp.documentation === undefined ||
          selectedApp.documentation === null ||
          selectedApp.documentation.length === 0 ? (
            <span style={{ textAlign: "center" }}>
              <Typography
                variant="body1"
                style={{ marginLeft: 25, marginRight: 25 }}
              >
                {selectedApp.description}
              </Typography>
              <Divider
                style={{
                  marginTop: 25,
                  marginBottom: 25,
                  backgroundColor: theme.palette.inputColor,
                }}
              />
              <Typography variant="h6">
                There is currently no extended documentation available for this
                app.
              </Typography>
              <Typography variant="body1" style={{ marginTop: 25 }}>
                Want help help making or using this app?{" "}
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://discord.gg/B2CBzUm"
                  style={{ textDecoration: "none", color: "#f86a3e" }}
                >
                  Join the community on Discord!
                </a>
              </Typography>

              <Typography variant="h6" style={{ marginTop: 50 }}>
                Want to help change this app directly?
              </Typography>
              {selectedApp.reference_info === undefined ||
              selectedApp.reference_info === null ||
              selectedApp.reference_info.github_url === undefined ||
              selectedApp.reference_info.github_url === null ||
              selectedApp.reference_info.github_url.length === 0 ? (
                <span>
                  <Typography variant="body1" style={{ marginTop: 25 }}>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={"https://github.com/shuffle/python-apps"}
                      style={{ textDecoration: "none", color: "#f86a3e" }}
                    >
                      Check it out on Github!
                    </a>
                  </Typography>
                </span>
              ) : (
                <span>
                  <Typography variant="body1" style={{ marginTop: 25 }}>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={selectedApp.reference_info.github_url}
                      style={{ textDecoration: "none", color: "#f86a3e" }}
                    >
                      Check it out on Github!
                    </a>
                  </Typography>
                </span>
              )}
            </span>
          ) : 
						null
          }
        </div>
      </div>
    </Dialog>
  ) : null

	const deleteWorkflow = (workflow_id) => {
    fetch(globalUrl + "/api/v1/workflows/" + workflow_id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
		.then((response) => {
			if (response.status !== 200) {
				console.log("Status not 200 for workflows :O!");
			}

			return response.json();
		})
		.then((responseJson) => {
			console.log("Deleted workflow")
		})
		.catch((error) => {
			//alert.error(error.toString());
			console.log("Delete workflow error: ", error.toString());
		})
	}

	const getWorkflow = (workflow_id) => {
    fetch(globalUrl + "/api/v1/workflows/" + workflow_id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
		.then((response) => {
			if (response.status !== 200) {
				console.log("Status not 200 for workflows :O!");
			}

			return response.json();
		})
		.then((responseJson) => {
			setWorkflow(responseJson)

			if (window !== undefined && !window.location.href.includes("/workflows")) {
				setConfigureWorkflowModalOpen(true)
			}
		})
		.catch((error) => {
			//alert.error(error.toString());
			console.log("Get workflows error: ", error.toString());
		})
	}

	const mergeWorkflowUsecases = (usecasedata) => {
		//const url = `${globalUrl}/api/v1/workflows/merge`;
		//const url = `https://0360-178-232-150-183.ngrok.io/api/v1/workflows/merge`;
		const url = `https://shuffler.io/api/v1/workflows/merge`;
		fetch(url, {
			mode: "cors",
			method: "POST",
			body: JSON.stringify(usecasedata),
			credentials: "include",
			crossDomain: true,
			withCredentials: true,
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
		})
		.then((response) =>
			response.json().then((responseJson) => {
				setIsUploading(false)
				var changed = false

					if (responseJson.success === false) {
						if (responseJson.reason !== null && responseJson.reason !== undefined) {
							//alert.error(responseJson.reason)
						}

						if (responseJson.source === "") {
							const appname = 
							usecasedata.source.error = usecasedata.source.app_name === undefined ? "Select a Trigger workflow first" : `${usecasedata.source.app_name} has no public trigger workflow yet. Click this to try another app`
							changed = true 
							} else {
								usecasedata.source.error = ""
								changed = true 
							}

						if (responseJson.destination === "") {
							usecasedata.destination.error = usecasedata.destination.app_name === undefined ? "Select a Subflow first" : `${usecasedata.destination.app_name} has no public subflow yet. Click this to try another app`
							changed = true 
						} else {
							usecasedata.destination.error = ""
							changed = true 
						}

						if (responseJson.middle !== undefined) {
							for (var key in responseJson.middle) {
								for (var subkey in usecasedata.middle) {
									if (responseJson.middle[key] === usecasedata.middle[key].text) {
										console.log("Found: ")
										if (usecasedata.middle[subkey].app_name === undefined || usecasedata.middle[subkey].app_name === "") {
											usecasedata.middle[subkey].error = `${usecasedata.middle[subkey].type} app must be selected first. Click this to change`
										} else {
											usecasedata.middle[subkey].error = `${usecasedata.middle[subkey].app_name} has no public subflow yet. Click this to change`
										}

										changed = true
										break
									}
								}
							}
						}
					} else {
						if (!isCloud) {
							console.log("Not cloud!")
							setFoundWorkflowId(responseJson.id)
							setWorkflow(responseJson)
						} else if (isCloud) {
							if (responseJson.workflow_id !== null && responseJson.workflow_id !== undefined) {
								if (responseJson.added_auth !== undefined && responseJson.added_auth !== null && responseJson.added_auth.length > 0) {
									console.log("SHOULD HANDLE AUTH: ", responseJson.added_auth)
									setConfigureWorkflowAuth(responseJson.added_auth)
				
									if (setFoundWorkflowId !== undefined) {
										console.log("Set found workflow id: ", responseJson.workflow_id)
										setFoundWorkflowId(responseJson.workflow_id)
									}

									getWorkflow(responseJson.workflow_id) 
									getAppAuthentication()
								} else {
									if (setFoundWorkflowId !== undefined) {
										console.log("Set found workflow id: ", responseJson.workflow_id)
										setFoundWorkflowId(responseJson.workflow_id)
									}

									setWorkflow({"id": responseJson.workflow_id})
								}
							}

							if (responseJson.auth_required === true) {
								console.log("SET AUTH AS NEXT STEP!")
							}


						}
					}
					
					if (changed === true) {
						setAllUsecases([usecasedata])
					}
			})
		)
		.catch((error) => {
			setIsUploading(false)
			console.log("Merge err: ", error.toString())
			//alert.error("Err: " + error.toString());
		});
	}

	//console.log("Filled in: ", appFramework, usecases)
	if (appFramework !== undefined && usecases !== undefined) {

		for (var key in usecases) {
			// source
			const usecase = usecases[key]
			if (usecase.source.type === undefined || usecase.source.image === "" || usecase.source.image === undefined) {
				usecases[key].source.image = theme.palette.defaultImage
			} 

			if (usecase.destination.type === undefined || usecase.destination.image === "" || usecase.destination.image === undefined) {
				usecases[key].destination.image = theme.palette.defaultImage
			}

			const srctype = getType(usecase.source.type)
			const dsttype = getType(usecase.destination.type)

			const srcinfo = appFramework[srctype]
			if (srcinfo !== undefined && srcinfo.large_image !== undefined && srcinfo.large_image !== "" && (usecases[key].source.app_name === undefined || usecases[key].source.app_name === "")) {
				usecases[key].source.image = srcinfo.large_image
				usecases[key].source.app_id = srcinfo.id
				usecases[key].source.app_name = srcinfo.name
			}

			const destinfo = appFramework[dsttype]
			if (destinfo !== undefined && destinfo.large_image !== undefined && destinfo.large_image !== "" && (usecases[key].destination.app_name === undefined || usecases[key].destination.app_name === "")) {
				usecases[key].destination.image = destinfo.large_image
				usecases[key].destination.app_id = destinfo.id
				usecases[key].destination.app_name = destinfo.name
			}

			if (usecase.middle !== undefined && usecase.middle !== null && usecase.middle.length > 0) {
				for (var subkey in usecase.middle) {
					const midcase = usecase.middle[subkey]

					const midtype = getType(midcase.type)
					const midinfo = appFramework[midtype]
					if (midinfo !== undefined && midinfo.large_image !== undefined && midinfo.large_image !== "" && (usecases[key].middle[subkey].app_name === undefined || usecases[key].middle[subkey].app_name === "")) {
						usecases[key].middle[subkey].image = 		midinfo.large_image
						usecases[key].middle[subkey].app_id = 	midinfo.id
						usecases[key].middle[subkey].app_name = midinfo.name
					} else {
						if (usecases[key].middle[subkey].image === undefined || usecases[key].middle[subkey].image === "") {
							usecases[key].middle[subkey].image = 		theme.palette.defaultImage
						}
					}
				}
			}
		}

		//if (firstRequest) {
		//	setAllUsecases(usecases)
		//	setFirstRequest(false)
		//}
	}

  const configureWorkflowModal =
    configureWorkflowModalOpen ? (
      <Dialog
        open={configureWorkflowModalOpen}
        PaperProps={{
          style: {
            backgroundColor: theme.palette.surfaceColor,
            color: "white",
            minWidth: 600,
						minHeight: 450, 
						border: theme.palette.defaultBorder,
          },
        }}
      >
        <IconButton
          style={{
            zIndex: 5000,
            position: "absolute",
            top: 14,
            right: 14,
            color: "white",
          }}
          onClick={() => {
            setConfigureWorkflowModalOpen(false);
          }}
        >
          <CloseIcon />
        </IconButton>
        <ConfigureWorkflow
          alert={alert}
          theme={theme}
          globalUrl={globalUrl}
          workflow={workflow}
          apps={apps}
          appAuthentication={appAuthentication}
          isCloud={isCloud}
          setConfigureWorkflowModalOpen={setConfigureWorkflowModalOpen}
          setAuthenticationType={setAuthenticationType}
          setAuthenticationModalOpen={setAuthenticationModalOpen}
          setSelectedAction={setSelectedAction}
          setSelectedApp={setSelectedApp}
					showTriggers={false}
        />
				{/*
          referenceUrl={referenceUrl}
          submitSchedule={submitSchedule}
          appAuthentication={appAuthentication}
          selectedAction={selectedAction}
          saveWorkflow={saveWorkflow}
          newWebhook={newWebhook}
				*/}
      </Dialog>
    ) : null


		const createWorkflowFromTemplate = (data) => {
			if (workflow.id !== undefined && workflow.id !== null && workflow.id.length !== 0) {
				console.log("Should delete old one: ", workflow.id)
				deleteWorkflow(workflow.id) 
			}

			// Should be searched?
			setIsUploading(true)

			var changed = false
			if (data.source.app_name === "") {
				data.source.error = `'${data.source.type}' app must be selected first`
				changed = true 
			}

			if (data.destination.app_name === "") {
				data.destination.error = `'${data.destination.type}' app must be selected first`
				changed = true 
			}

			if (data.middle !== undefined && data.middle !== null && data.middle.length > 0) {
				for (var key in data.middle) {
					const middleItem = data.middle[key]
					if (middleItem.app_name === "") {
						data.middle[key].error = `'${middleItem.type}' app must be selected first`
						//changed = true 
					}
				}
			}

			if (changed) {
				alert.error("Errors were found. Click them to sort sort them out or go to the next usecase.")

				setUpdate(Math.random())
				setIsUploading(false)
				return
			}

			// Auto finding these during deploy
			//data.source.workflow_id = "e506060f-0c58-4f95-a0b8-f671103d78e5"
			//data.destination.workflow_id = "ffe8122d-0787-425a-aa20-c2587ee75a83"
			//if (data.middle !== undefined && data.middle !== null && data.middle.length > 0) {
			//	data.middle[0].workflow_id = "1077d9ee-b571-4410-a7e6-261f32f346c5"
			//}

			mergeWorkflowUsecases(data) 
		}

	if (autotry === true && firstRequest === true) {
			console.log("Should autotry the usecase! Make sure data is in order first. Usecase: ", usecases)

		if (usecases !== undefined && usecases !== null && usecases.length > 0 && usecases[0].name !== "") {
  		setFirstRequest(false)
			createWorkflowFromTemplate(usecases[0]) 
		}
		//{usecases.map((data, index) => {
	}


	const ShowBox = (props) => {
		const { data, type, index, miditem, subindex } = props

		const [expanded, setexpanded] = React.useState(false)
		const [newSelectedApp, setNewSelectedApp] = React.useState({})
		const [paperTitle, setPaperTitle] = React.useState(data.type)
		const [selectionOpen, setSelectionOpen] = React.useState(false)
		const [discoveryData, setDiscoveryData] = React.useState({
			"id": "",
			"label": "",
			"name": "",
			"large_image": "",
		})

		//console.log("Data: ", data)

		const setFrameworkItem = (data) => {
			fetch(globalUrl + "/api/v1/apps/frameworkConfiguration", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(data),
				credentials: "include",
			})
				.then((response) => {
					if (response.status !== 200) {
						console.log("Status not 200 for framework!");
					}

					return response.json();
				})
				.then((responseJson) => {
					if (responseJson.success === false) {
						if (responseJson.reason !== undefined) {
							alert.error("Failed updating default app: " + responseJson.reason)
						} else {
							alert.error("Failed to update framework for your org.")

						}
					} else {
						if (getFramework !== undefined) {
							getFramework()
						}
					}

					//setFrameworkLoaded(true)
					//setFrameworkData(responseJson)
				})
				.catch((error) => {
					alert.error(error.toString());
					//setFrameworkLoaded(true)
				})
		}

		useEffect(() => {
			if (newSelectedApp.objectID === undefined) {
				return
			}

			var discoveredtype = ""
			if (type === "middle") {
				console.log("Updating middle index", subindex)

				allusecases[index][type][subindex]["app_id"] = newSelectedApp.objectID
				allusecases[index][type][subindex]["app_name"] = newSelectedApp.name
				allusecases[index][type][subindex]["app_version"] = newSelectedApp.app_version
				allusecases[index][type][subindex]["image"] = newSelectedApp.image_url
				allusecases[index][type][subindex]["error"] = ""

				discoveredtype = allusecases[index][type][subindex]["type"]
			} else {
				allusecases[index][type]["app_id"] = newSelectedApp.objectID
				allusecases[index][type]["app_name"] = newSelectedApp.name
				allusecases[index][type]["app_version"] = newSelectedApp.app_version
				allusecases[index][type]["image"] = newSelectedApp.image_url
				allusecases[index][type]["error"] = ""

				discoveredtype = allusecases[index][type]["type"]
			}
					
			setSelectionOpen(false)
			setUpdate(Math.random())
			setAllUsecases(allusecases)

			const submitValue = {
				"type": discoveredtype,
				"name": newSelectedApp.name,
				"id": newSelectedApp.objectID,
				"large_image": newSelectedApp.image_url,
				"description": newSelectedApp.description,
			}

			setFrameworkItem(submitValue) 
		}, [newSelectedApp])

		if (data.text === undefined || data.text === null || data.text.length === 0) {
			return null
		}

		const changeAppType = () => {
			setSelectionOpen(true)
		}

		const looplist = type === "source" ? triggerlist : type === "destination" ? subflows : midflows
		const hasError = data.error !== undefined && data.error !== null && data.error.length > 0
		const borderColor = hasError ? theme.palette.primary.main : "rgba(255,255,255,0.3)"

		return (
			<div style={{border: `1px solid ${borderColor}`, backgroundColor: theme.palette.platformColor, borderRadius: theme.palette.borderRadius, width: miditem === true ? "75%" : "100%", marginLeft: miditem === true ? 25 : 0, }}>

				{selectionOpen === true ?
					<AppsearchPopout 
						paperTitle={paperTitle}
						setPaperTitle={setPaperTitle}
						newSelectedApp={newSelectedApp}
						setNewSelectedApp={setNewSelectedApp}
						selectionOpen={selectionOpen}
						setSelectionOpen={setSelectionOpen}
						discoveryData={discoveryData}
						setDiscoveryData={setDiscoveryData}
						userdata={userdata}
					/>
				: null}

				<div style={{display: "flex", margin: 10, }}>
					<div style={{display: "flex", width: "75%",}}>
						<Tooltip title={data.text}>
							<img src={data.image} alt={data.app_name} style={imagestyle} onClick={() => {

								if (data.type === undefined || data.type === null || data.type === "") {
									setexpanded(true)
									console.log("No type. Skipping window open.")
									return
								} 

								changeAppType()
							}}/>
						</Tooltip>
						<div>
							<Typography variant="h6" color="textSecondary" style={{marginLeft: 20, marginTop: hasError ? 0 : 10, maxWidth: 250, overflow: "hidden", }}>
								{data.text}
							</Typography>
							{hasError ?
								<Typography variant="body2" color="textSecondary" style={{color: theme.palette.primary.main, marginLeft: 20, cursor: "pointer", }} onClick={() => {
									if (data.type === undefined || data.type === null || data.type === "") {
										setexpanded(true)
										console.log("No type. Skipping window open.")
										return
									} 

									changeAppType()
								}}>
									{data.error}
								</Typography>
								: 
							null}
						</div>
					</div>
					<div style={{display: "flex", }}>
						<Tooltip
							color="secondary"
							title={`See documentation for how to make the usecase '${data.text.toLowerCase()}'`}
							placement="top"
						>
							<span>
								<IconButton 
									disabled={true}
									onClick={() => {
									}}
								>
									<span>
										<a
											href={`https://shuffler.io/docs/creators#${data.text.toLowerCase()}`}
											rel="norefferer"
											target="_blank"
											style={{ textDecoration: "none",  }}
										>
											<DescriptionIcon style={{color: "grey", }}/>
										</a>
									</span>
								</IconButton>
							</span>
						</Tooltip>
						{type === "middle" ? 
							<IconButton 
								onClick={() => {
									allusecases[index][type] = []

									setAllUsecases(allusecases)
									setUpdate(Math.random())
								}}
							>
								<DeleteIcon />
							</IconButton>
						: null}
						<Tooltip
							color="secondary"
							title={`See ${expanded ? "less" : "more"} options`}
							placement="top"
						>
							<span>
								<IconButton 
									disabled={canExpand === false}
									onClick={() => {
										setexpanded(!expanded)
									}}
								>
									{expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
								</IconButton>
							</span>
						</Tooltip>
					</div>
				</div>

				{expanded ? 
					looplist.map((subdata, curindex) => {
						if (appFramework === undefined) {
							subdata.image = theme.palette.defaultImage
						} else {
							const srctype = getType(subdata.type)
							const srcinfo = appFramework[srctype]

							if (srcinfo !== undefined && srcinfo.large_image !== undefined && srcinfo.large_image !== "" && (subdata.app_name === undefined || subdata.app_name === "")) {
								subdata.image = srcinfo.large_image
								subdata.app_id = srcinfo.id
								subdata.app_name = srcinfo.name
							} else {
								subdata.image = theme.palette.defaultImage
							}
						}

						return (
							<div key={curindex} style={{display: "flex", maxHeight: 40, minHeight: 40, borderTop: "1px solid rgba(255,255,255,0.3)", }} onClick={() => {
								if (subdata.disabled === true) {
									//alert.info("Usecase not available yet.")
									return
								}

								if (type === "middle") {
									allusecases[index][type][subindex] = subdata
								} else { 
									allusecases[index][type] = subdata
								}

								setAllUsecases(allusecases)
								setUpdate(Math.random())
								setexpanded(false)
							}}>
								<img src={subdata.image} alt={subdata.app_name} style={{
									height: 24,
									width: 24,
									borderRadius: 15, 
									border: "1px solid rgba(255,255,255,0.3)",
									margin: 7,
									marginLeft: 24,
									cursor: subdata.disabled === true ? "auto": "pointer",
								}} onClick={() => {
								}}/>
								<Typography variant="body2" color={subdata.disabled === true ? "textSecondary" : "textPrimary"} style={{cursor: "pointer", margin: 7, marginTop: 10,}}>
									{subdata.text}
								</Typography>
							</div>
						)
					})
					:
				 null
				}
			</div>
		)
	}

	//console.log("ALLUSECASES: ", allusecases)

	return (
		<div style={{maxWidth: "100%", minWidth: "100%",  }}>
      {configureWorkflowModal}
			{authenticationModal}
			{showTitle !== false && defaultSearch !== undefined ?
				<Typography variant="h6" style={{marginBottom: 10, textAlign: "center",}}>
					<b>{defaultSearch}: {allusecases[usecaseIndex].name}</b>
				</Typography>
			: null}
			{usecases.map((data, index) => {
				return (
					<div key={index} style={{}}>
						<ShowBox data={data.source} type={"source"} index={index} />

						{data.middle !== undefined && data.middle !== null && data.middle.length > 0 ?
							data.middle.map((innerdata, innerindex) => {
								return (
									<div key={innerindex}>
										<div style={{backgroundColor: "rgba(255,255,255,0.3", minWidth: 1, maxWidth: 1, minHeight: 20, maxHeight: 20, margin: "auto", }} />
										<ShowBox key={innerindex} data={innerdata} miditem={true} type={"middle"} index={index} subindex={innerindex} />
									</div>
								)
							})
						: null}

						<div style={{backgroundColor: "rgba(255,255,255,0.3", minWidth: 1, maxWidth: 1, minHeight: 20, maxHeight: 20, margin: "auto", }} />
						{defaultSearch !== undefined && data.middle.length === 0 ? 
							<span style={{}}>
								<IconButton 
									style={{
										width: 24,
										height: 26,
										padding: 0, 
										marginLeft: "47.4%",
									}}
									onClick={() => {
										console.log("Click add middle!")

										allusecases[index].middle.push(midflows[0])
										setAllUsecases(allusecases)
										setUpdate(Math.random())
									}}
								>
									<AddCircleOutlineIcon style={{marginLeft: 0, }}/>
								</IconButton>
								<div style={{backgroundColor: "rgba(255,255,255,0.3", minWidth: 1, maxWidth: 1, minHeight: 20, maxHeight: 20, margin: "auto", }} />
							</span>
						: null}

						<ShowBox data={data.destination} type={"destination"} index={index} />
						{showTitle !== false && workflow.id === undefined ?
							<Button 
								fullWidth 
								style={{marginTop: 50,}} 
								variant={"contained"} 
								color="primary" 
								onClick={() => {
									createWorkflowFromTemplate(data)

								}}
							>
								{isUploading ? 
									<CircularProgress style={{height: 25, width: 25, marginLeft: "auto", marginRight: "auto", }} /> 
									: 
									"Try this Workflow Template"
								}
							</Button> 
						: null}
						{workflow.id === undefined || defaultSearch === undefined ? 
							null
							:
							<a
								href={`/workflows/${workflow.id}`}
								rel="norefferer"
								target="_blank"
								style={{ textDecoration: "none",  }}
							>
								<Button fullWidth style={{marginTop: 50,}} variant={"contained"} color="secondary" onClick={() => {
								}}>
									Check out your new Workflow
								</Button> 
							</a>
						}
					</div>
				)
			})}
		</div>
	)
}

export default UsecaseSearch 

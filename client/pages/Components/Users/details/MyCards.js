import { useState , useEffect} from "react";
import {
  Box,
  Grid,
  Radio,
  FormControlLabel,
  Typography,
  Card,
  CardHeader,
  Divider,
  lighten,
  CardActionArea,
  CardContent,
  Tooltip,
  IconButton,
  Avatar,
  styled,
} from "@mui/material";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import FormModal from "../../Modals";
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from "react-beautiful-dnd";
import { useStrictDroppable } from "../../Dragable/useDragable";
import { ButtonGroupWithLabel } from "../../GroupButton";
const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardLogo = styled("img")(
  ({ theme }) => `
      border: 1px solid ${theme.colors.alpha.black[30]};
      border-radius: ${theme.general.borderRadius};
      padding: ${theme.spacing(1)};
      margin-right: ${theme.spacing(2)};
      background: ${theme.colors.alpha.white[100]};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        box-shadow: none;
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[100]};
        }
`
);

const IconButtonError = styled(IconButton)(
  ({ theme }) => `
     background: ${theme.colors.error.lighter};
     color: ${theme.colors.error.main};
     padding: ${theme.spacing(0.5)};

     &:hover {
      background: ${lighten(theme.colors.error.lighter, 0.4)};
     }
`
);

const CardCc = styled(Card)(
  ({ theme }) => `
     border: 1px solid ${theme.colors.alpha.black[30]};
     background: ${theme.colors.alpha.black[5]};
     box-shadow: none;
`
);

const MyCards = ({ project }) => {
  const [enabled] = useStrictDroppable(false);
  const data = {
    savedCards: project?.projects?.length,
  };
  const proj = [
    {
      projectEndDate: "2023-01-19T18:30:00.000Z",
      projectName: "asd",
      projectStartDate: "2023-01-18T18:30:00.000Z",
      teamSize: 4,
      _id: "63bb1a3129e32a619312a4",
    },
    {
      projectEndDate: "2023-01-19T18:30:00.000Z",
      projectName: "asdasda",
      projectStartDate: "2023-01-18T18:30:00.000Z",
      teamSize: 5,
      _id: "63bb1a3129e32a619312a5",
    },
    {
      projectEndDate: "2023-01-19T18:30:00.000Z",
      projectName: "asqweqwd",
      projectStartDate: "2023-01-18T18:30:00.000Z",
      teamSize: 6,
      _id: "63bb1a3129e32a619312a6",
    },
    {
      projectEndDate: "2023-01-19T18:30:00.000Z",
      projectName: "asqweqwd",
      projectStartDate: "2023-01-18T18:30:00.000Z",
      teamSize: 7,
      _id: "63bb1a3129e32a619312a7",
    },
  ];
  const [editModal, setEditModal] = useState(false);
  const [projects, setProjects] = useState(project.projects);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleDelete = () => {};
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProjects(items);
    resetServerContext();
  }
  return (
    <Card>
      <FormModal
        isShow={editModal}
        handleClose={() => setEditModal(false)}
        data={project?.projects}
      />
      <CardHeader subheader={data.savedCards + " Projects"} title="Projects" />
      <Divider />
      <Box p={4}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
         {enabled && 
          <Droppable droppableId="projects">
            {(provided) => (
              <Grid
                container
                spacing={4}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {!!projects &&
                  projects.map((proj, index) => {
                    return (
                      <Draggable
                        key={proj?._id}
                        draggableId={proj?._id}
                        index={index}
                      >
                        {(provided) => (
                          
                          <Grid
                            key={proj?.id}
                            item
                            xs={12}
                            sm={12}
                            className="justify-center content-center"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            
                            <CardCc sx={{ px: 2, pt: 2, pb: 1 }}>
                            <Tooltip arrow title="Drag to top and set as current project ">
                              
                              <Box display="flex" alignItems="center">
                                <CardLogo
                                  src="data:image/png;base64,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"
                                  alt="Project"
                                  width={"300px"}
                                />
                                <Box>
                                  <Typography variant="h3" fontWeight="normal" textTransform={"capitalize"}>
                                    {proj.projectName}
                                  </Typography>
                                  <Typography variant="h4" color="text.primary">
                                    Team Size: {proj.teamSize}
                                  </Typography>
                                  <Typography variant="subtitle2">
                                    Start Date:{" "}
                                    <Typography
                                      component="span"
                                      color="text.primary"
                                    >
                                      {!!proj.projectStartDate &&
                                        new Date(
                                          proj.projectStartDate
                                        ).toLocaleDateString()}
                                    </Typography>
                                  </Typography>
                                  <Typography variant="subtitle2">
                                    End Date:{" "}
                                    <Typography
                                      component="span"
                                      color="text.primary"
                                    >
                                      {!!proj.projectEndDate &&
                                        new Date(
                                          proj.projectEndDate
                                        ).toLocaleDateString()}
                                    </Typography>
                                  </Typography>
                                </Box>           
                              </Box>
                              </Tooltip>
                              <Box
                                pt={0}
                                display="flex"
                                alignItems="center"
                                justifyContent="flex-end"
                              >
                                <ButtonGroupWithLabel
                    isEdit={true}
                    disabled={!!!data}
                    onEditPress={() => setEditModal(true)}
                  />
                              </Box>
                            </CardCc>
                          </Grid>
                        )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
          }
        </DragDropContext>

        <Grid item xs={12} sm={12} spacing={2} style={{ marginTop: "2rem" }}>
          <Tooltip arrow title="Click to add a new project">
            <CardAddAction onClick={() => setEditModal(true)}>
              <CardActionArea sx={{ px: 1 }}>
                <CardContent>
                  <AvatarAddWrapper>
                    <AddTwoToneIcon fontSize="large" />
                  </AvatarAddWrapper>
                </CardContent>
              </CardActionArea>
            </CardAddAction>
          </Tooltip>
        </Grid>
        {/* </Grid> */}
      </Box>
    </Card>
  );
};

export default MyCards;

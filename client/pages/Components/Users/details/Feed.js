import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  Grid,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { ButtonGroupWithLabel } from "../../GroupButton";
import FormModal from "../../Modals";
import { AuthContext } from "../../../Context/auth-context";


function Feed({ skills }) {
  const { isUserAdmin } = useContext(AuthContext);
  const router = useRouter();
  const data = router.query;
  const [editModal, setEditModal] = React.useState(false)
  const skillData = skills;
  return (
    <>
    <Card>
    <FormModal
        isShow={editModal}
        handleClose={()=>setEditModal(false)}
        data={skills}
        isSkill={true}
      />
      <div className="flex justify-between w-full py-2 px-5">
      <h1 className="text-left text-xl ">Top 5 Skills</h1>
      <ButtonGroupWithLabel
                    isEdit={isUserAdmin}
                    disabled={!!!data}
                    onEditPress={() => setEditModal(true)}
                  />
      
      </div>
      <Divider />
      <Box p={2}>
        <Grid container spacing={0}>
          { !!skillData && skillData?.skills?.map((_feed) => (
            <Grid key={_feed} item xs={12} sm={6} lg={4}>
              <Box p={3} display="flex" alignItems="flex-start">
                <Avatar src={_feed.avatar} />
                <Box pl={2}>
                  {/* <Typography gutterBottom variant="subtitle2">
                    {_feed.company}
                  </Typography> */}
                  <Typography variant="h4" gutterBottom>
                    {_feed}
                  </Typography>
                  {/* <Typography color="text.primary" sx={{ pb: 2 }}>
                    {_feed.jobtitle}
                  </Typography> */}
                  {/* <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddTwoToneIcon />}
                  >
                    Follow
                  </Button> */}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
    </>
  );
}

export default Feed;

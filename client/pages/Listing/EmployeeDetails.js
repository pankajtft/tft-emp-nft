import Head from "next/head";

import { Grid, Container } from "@mui/material";

import ProfileCover from "../Components/Users/details/ProfileCover";
import Transaction from "../Components/Users/details/Transaction";
import Feed from "../Components/Users/details/Feed";
import PopularTags from "../Components/Users/details/PopularTags";
import MyCards from "../Components/Users/details/MyCards";
import Addresses from "../Components/Users/details/Addresses";
import { useRouter } from "next/router";
function EmployeeDetails(props) {
  const router = useRouter();
  const data = router.query;
  const item = JSON.parse(data?.data);
  const user = {
    savedCards: 7,
    name: item?.empDetail?.name,
    empcode: item?.empDetail?.empCode,
    email: item?.empDetail?.email,
    designation: item?.projDetails?.[0]?.designation,
    skills: [{ title: "React" }, { title: "Vue" }, { title: "Angular" }],
    coverImg:
      "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
    avatar: "https://wallpapers.com/images/featured/4co57dtwk64fb7lv.jpg",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage",
    jobtitle: "Web Developer",
    location: "Barcelona, Spain",
    followers: "465",
  };
  console.log(item, "Data");
  return (
    <div className="bg-my_bg_image py-8">
      <Head>
        <title>Employee Details</title>
      </Head>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          // style={{background:'linear-gradient(to right, #332575, #928DAB)', padding:"2rem", borderRadius:'1rem'}}
        >
          <Grid item xs={2} md={12}>
            <ProfileCover user={user} />
            {/* </Grid> */}
            {/* <Grid item xs={12} md={4}>
             <RecentActivity />
          </Grid> */}
            {/* <Grid item xs={12} md={12}> */}
            <Feed skills={item?.empDetail?.skills} />
          </Grid>
          {/* <Grid item xs={12} md={4}>
            <PopularTags />
          </Grid> */}
          <Grid item xs={12} md={12}>
            <MyCards project={item?.projDetails} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Transaction transaction={item?.transactionDetails} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default EmployeeDetails;

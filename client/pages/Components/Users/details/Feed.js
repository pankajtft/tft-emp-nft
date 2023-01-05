import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  Grid,
  Button
} from '@mui/material';
import { useRouter } from 'next/router';



import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function Feed() {
  const router = useRouter();
  const data = router.query;
  const item = JSON.parse(data?.data)

  const feed = item?.empDetail?.skills.map((skill) => ({
    name: skill.title,
    jobtitle: 'Senior Accountant',
    company: 'Trudoo',
    avatar: '/static/images/avatars/1.jpg'
  }))

  return (
    <Card>
      <CardHeader title="Top 5 Skills" />
      <Divider />
      <Box p={2}>
        <Grid container spacing={0}>
          {feed.map((_feed) => (
            <Grid key={_feed.name} item xs={12} sm={6} lg={4}>
              <Box p={3} display="flex" alignItems="flex-start">
                <Avatar src={_feed.avatar} />
                <Box pl={2}>
                  {/* <Typography gutterBottom variant="subtitle2">
                    {_feed.company}
                  </Typography> */}
                  <Typography variant="h4" gutterBottom>
                    {_feed.name}
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
  );
}

export default Feed;

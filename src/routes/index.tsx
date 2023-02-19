import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
} from "@mantine/core";
import { IconCheck, IconDice2 } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import image from "../images/image.png";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    zIndex: 1,
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: "20px 20px 20px 0",
    padding: "4px 12px",
  },

  highlight2: {
    position: "relative",
    backgroundColor: "#e6770033",
    borderRadius: "0 20px 20px 20px",
    padding: "4px 12px",
  },
}));

export default function HeroBullets() {
  const { classes } = useStyles();
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <span className={classes.highlight}>Ultramarine</span> <br />
              <span className={classes.highlight2}>Game Protocol</span>
            </Title>
            <Text color="dimmed" mt="md">
              Game protocoll for building games based on cryptographically
              secure randomness.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl" color="yellow">
                  <IconCheck />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Create</b> your own game.
              </List.Item>
              <List.Item>
                <b>Add liquidity</b> to the game.
              </List.Item>
              <List.Item>
                <b>Invite users</b> to try their luck.
              </List.Item>
            </List>

            <Group mt={30}>
              <Link to={`/games`}>
                <Button
                  radius="xl"
                  size="md"
                  className={classes.control}
                  leftIcon={<IconDice2></IconDice2>}
                  color="cyan"
                >
                  Launch App
                </Button>
              </Link>
              <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
                component="a"
                href="https://github.com/UltramarineApp"
                target="_blank"
              >
                Source code
              </Button>
            </Group>
          </div>
          <Image src={image} className={classes.image} />
        </div>
      </Container>
    </div>
  );
}

//Material
import { Box, CssBaseline, Container } from "@mui/material";
//Components
import styles from "./RoleMaintainer.module.css";
import RoleTable from "./RoleTable";

const RoleMaintainer = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box className={styles.container}>
          <Box className={styles.containerTable}>
            <RoleTable />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default RoleMaintainer;

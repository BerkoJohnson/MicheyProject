const envalid =require('envalid');

function validateEnv() {
    envalid.cleanEnv(process.env, {
      MONGO_PASSWORD: envalid.str(),
      MONGO_PATH: envalid.str(),
      MONGO_USER: envalid.str(),
      PORT: envalid.port()
    });
}

export default validateEnv;
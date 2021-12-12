import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import ironConfig from "../../utils/iron-config";

async function login(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;

  try {
    const { data } = await axios.get(
      `${process.env.NEST_API_HOST}/accounts/${token}`
    );
    req.session.account = data;
    await req.session.save();
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(401).json({ message: "Unauthorized" });
  }
}

export default withIronSessionApiRoute(login, ironConfig);

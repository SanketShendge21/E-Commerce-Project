// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    // Pincode object corresponding to state and cities
    let pincodes ={
      "411048": ["Pune","Maharastra"],
      "721302": ["Kharagpur","West Bengal"],
      "110003": ["Delhi", "Delhi"],
      "560017" : ["Banglore", "Karnataka"]
    }
    res.status(200).json(pincodes)
  }
  
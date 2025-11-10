# Modified h8k stylesheet

Several components in the project originate from HackerRank.com, which standardizes their UI/design
on the [H8K Design Library](https://h8k-design.vercel.app/).  Because this style adds bloat and 
pollutes the global CSS namespace, `h8k.module.css` has been created to include only the styles
that are actually used in this project.

For reference, the original h8k stylesheet is saved in the file `h8k-original.module.css`.  This file
originates in `node_modules/h8k-design/dist/h8k.module.css` when the `h8k-design` package is installed.

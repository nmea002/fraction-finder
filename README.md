# Fraction Stimuli Finder

This tool helps educational researchers quickly filter and export fraction pair stimuli used in past studies. I built this based on the needs of my research professor, who regularly had to identify stimuli that already been used and look for patterns in those stimuli such as unit fractions, misleading pairs, or benchmark values.

## Table of Contents
- [Approach](#approach)
- [Future Work](#future-work)
- [References](#references)
  
## Approach 
I took the studies from [References](#references), which only had the fraciton pairs and calculated the following attributes and put them in a PostgreSQL database hosted by Supabase. 

If a fraction pair was written as "1/9 1/2", then fraction 1 is 1/9, as it is the first fraction in the string, and fraction 2 is 1/2.
Here are the attriubutes:
- Fraction 1 numerator
- Fraction 1 numerator digits
- Fraction 1 denominator
- Fraction 1 denominator digits
- Fraction 1 decimal value
- Is fraction 1 irreducible (True/False)
- Is fraction 1 a unit fraction (True/False)
- Is fraction 1 a benchmark fraction (1/4, 1/3, 1/2, 2/3, or 3/4)
- Fraction 2 numerator
- Fraction 2 numerator digits
- Fraction 2 denominator
- Fraction 2 denominator digits
- Fraction 2 decimal value
- Is fraction 2 irreducible (True or False).
- Is fraction 2 a unit fraction 
- Is fraction 2 a benchmark fraction (1/4, 1/3, 1/2, 2/3, or 3/4)
- Author
- Year of the study
- Compatibility label
- Decimal distance (Fraction 1 decimal - Fraction 2 decimal)
- Numerator distance (Fraction 1 numerator - Fraction 2 numerator)
- Denominator distance (Fraction 1 denominator - Fraction 2 denominator)

Then I designed a user interface (UI) where a user can select filters for their fractions according to the above attributes. After the user selects their filters in the UI, the app takes those values and generates a SQL query to fetch the fraction pairs that fit the criteria. Finally, the app generates a CSV where you can download all the fraction pairs and use it for your studies. 

## Future Work
1. Build an LLM-powered chatbot that turns natural language queries into filters for selecting fraction stimuli.
2. Deploy the website.

## References 
DeWolf et al. (2016) [Neural representations of magnitude for natural and rational numbers](https://www.sciencedirect.com/science/article/pii/S1053811916303664?via%3Dihub)


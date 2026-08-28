package me.soaresgus.usersapi.validation;

public final class CpfUtils {

    private CpfUtils() {
    }

    public static String normalize(String cpf) {
        if (cpf == null) {
            return null;
        }
        return cpf.replaceAll("\\D", "");
    }

    public static boolean isValid(String cpf) {
        String digits = normalize(cpf);

        if (digits == null || digits.length() != 11) {
            return false;
        }

        if (digits.chars().distinct().count() == 1) {
            return false;
        }

        int firstCheckDigit = calculateCheckDigit(digits.substring(0, 9), 10);
        if (firstCheckDigit != Character.getNumericValue(digits.charAt(9))) {
            return false;
        }

        int secondCheckDigit = calculateCheckDigit(digits.substring(0, 10), 11);
        return secondCheckDigit == Character.getNumericValue(digits.charAt(10));
    }

    private static int calculateCheckDigit(String digits, int weightStart) {
        int sum = 0;
        int weight = weightStart;

        for (char digit : digits.toCharArray()) {
            sum += Character.getNumericValue(digit) * weight--;
        }

        int remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    }

}
